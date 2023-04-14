/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, react/function-component-definition */
// import { gql, useLazyQuery } from "@apollo/client";
import { Box, Collapse, Grid, MenuItem, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
// import makeStyles from "@mui/styles/makeStyles";
// import { CloseRounded, TuneRounded } from "@mui/icons-material";
import deLocale from "date-fns/locale/de";
import {
  addDays,
  addMonths,
  endOfMonth,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";
import React, {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { formatDE } from "../utils/util-functions";
import { UserDataContext } from "../utils/UserDataProvider";
import { dummyPools } from "../utils/dummy-data";
import { UserType } from "../types/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faFilter } from "@fortawesome/free-solid-svg-icons";
import IconWithMargin from "../components/utils/IconWithMargin";
import BtnTxt from "../components/utils/BtnTxt";

type UtilsBarSelectProps = {
  children: ReactNode;
  id: string;
  label: string;
  value: string;
  onChange: ({ target }: ChangeEvent<HTMLInputElement>) => void;
};

interface TimeFilterType {
  left: Date;
  right: Date;
}

type UtilsBarProps = {
  facilityID?: string;
  showDept?: boolean;
  showPools?: boolean;
  showJiMs?: boolean;
  showTime?: boolean;
  past?: boolean;
  btn?: ReactNode;
  setDeptsSel?: Dispatch<SetStateAction<string | string[]>>;
  setPoolsSel?: Dispatch<SetStateAction<string | string[]>>;
  setJimsSel?: Dispatch<SetStateAction<string | string[]>>;
  setTimesSel?: Dispatch<SetStateAction<TimeFilterType>>;
  customSlot?: ReactNode;
};

interface EventType {
  target: {
    value: string;
  };
}

// const GET_POOL_QUERY = gql`
//   query getPool($id: ID!) {
//     getPool(id: $id) {
//       id
//       title
//       description
//       workers {
//         id
//         first_name
//         last_name
//       }
//     }
//   }
// `;

const GET_POOL_QUERY = {
  loading: false,
  data: dummyPools,
};

const rightNow = new Date();

interface TimeFilterLibType {
  [key: string]: {
    filter: {
      left: Date;
      right: Date;
    };
    label: string;
  };
}

const timeFilterLibPast: TimeFilterLibType = {
  current: {
    filter: {
      left: subDays(new Date(), 30),
      right: rightNow,
    },
    label: "letzte 30 Tage",
  },
  thisMonth: {
    filter: {
      left: startOfMonth(new Date()),
      right: rightNow,
    },
    label: formatDE(new Date(), "MMMM"),
  },
  nextMonth: {
    filter: {
      left: startOfMonth(subMonths(new Date(), 1)),
      right: endOfMonth(subMonths(new Date(), 1)),
    },
    label: formatDE(subMonths(new Date(), 1), "MMMM"),
  },
};

const timeFilterLibFuture: TimeFilterLibType = {
  current: {
    filter: {
      left: rightNow,
      right: addDays(new Date(), 30),
    },
    label: "kommende 30 Tage",
  },
  thisMonth: {
    filter: {
      left: rightNow,
      right: endOfMonth(new Date()),
    },
    label: formatDE(new Date(), "MMMM"),
  },
  nextMonth: {
    filter: {
      left: startOfMonth(addMonths(new Date(), 1)),
      right: endOfMonth(addMonths(new Date(), 1)),
    },
    label: formatDE(addMonths(new Date(), 1), "MMMM"),
  },
};

const UtilsBarWrapper = styled("div")(({ theme }) => ({
  display: "none",
  // border: "2px dotted blue",
  position: "sticky",
  zIndex: 50,
  alignItems: "center",
  // margin: `0 ${theme.spacing(1)}`,
  padding: theme.spacing(1),
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
  "@media print": {
    display: "none",
  },
}));

const BtnWrapper = styled("div")(({ theme }) => ({
  marginLeft: theme.spacing(4),
}));

const UtilsBarSelect = ({ children, ...props }: UtilsBarSelectProps) => {
  return (
    <Grid item xs={3}>
      <TextField
        select
        fullWidth
        // size="small"
        variant="outlined"
        SelectProps={{
          sx: {
            backgroundColor: "white",
            "&:focus": {
              backgroundColor: "white",
            },
          },
        }}
        {...props}
      >
        {children}
      </TextField>
    </Grid>
  );
};

const UtilsBar = ({
  facilityID,
  showDept,
  showPools,
  showJiMs,
  showTime,
  past,
  btn,
  setDeptsSel,
  setPoolsSel,
  setJimsSel,
  setTimesSel,
  customSlot,
}: UtilsBarProps) => {
  const { userFacilitiesByID } = useContext(UserDataContext);
  // const [getPool, { data: singlePoolData }] = useLazyQuery(GET_POOL_QUERY);
  const { data: singlePoolData } = GET_POOL_QUERY;

  const [jimList, setJimList] = useState<UserType[]>([]);

  const [deptCurrSel, setDeptCurrSel] = useState("all-depts");
  const [poolCurrSel, setPoolCurrSel] = useState("all-pools");
  const [jimCurrSel, setJimCurrSel] = useState("all-jims");
  const [timeCurrSel, setTimeCurrSel] = useState("current");

  const [showCollapse, setShowCollapse] = useState(false);
  const [showTimeExtDialog, setShowTimeExtDialog] = useState(false);
  const [timeFilterExt, setTimeFilterExt] = useState(
    past ? timeFilterLibPast.current.filter : timeFilterLibFuture.current.filter
  );

  useEffect(() => {
    if (facilityID) {
      if (poolCurrSel === "all-pools") {
        setJimList(
          userFacilitiesByID[facilityID].users.map((user) => user.user)
        );
      } else if (singlePoolData && singlePoolData.getPool) {
        setJimList(singlePoolData.getPool.workers);
        setJimsSel(singlePoolData.getPool.workers.map((worker) => worker.id));
      }
    }
  }, [facilityID, singlePoolData]);

  const handleDeptChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    if (value === "all-depts") {
      setDeptsSel(
        userFacilitiesByID[facilityID].departments.map((dept) => dept.id)
      );
    } else {
      setDeptsSel(value);
    }
    setDeptCurrSel(value);
  };

  const handlePoolChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setJimCurrSel("all-jims");
    if (value === "all-pools") {
      setPoolsSel(userFacilitiesByID[facilityID].pools.map((pool) => pool.id));
      setJimList(userFacilitiesByID[facilityID].users.map((user) => user.user));
    } else {
      setPoolsSel(value);
      // getPool({ variables: { id: value } });
    }
    setPoolCurrSel(value);
  };

  const handleJimChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    if (value === "all-jims") {
      setJimsSel(singlePoolData.getPool.workers.map((worker) => worker.id));
    } else {
      setJimsSel(value);
    }
    setJimCurrSel(value);
  };

  const handleTimeChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    if (value === "open-ext-dialog") {
      setShowTimeExtDialog(true);
    } else {
      setTimeCurrSel(value);
      setTimesSel(
        past
          ? timeFilterLibPast[value].filter
          : timeFilterLibFuture[value].filter
      );
    }
  };

  const handleStartChange = (date: Date) => {
    if (date.getTime() > timeFilterExt.right.getTime()) {
      setTimeFilterExt({ left: date, right: date });
    } else {
      setTimeFilterExt({ ...timeFilterExt, left: date });
    }
  };

  const handleEndChange = (date: Date) => {
    if (date.getTime() < timeFilterExt.left.getTime()) {
      setTimeFilterExt({ left: date, right: date });
    } else {
      setTimeFilterExt({ ...timeFilterExt, right: date });
    }
  };

  const handleTimeExtChange = (e: MouseEvent) => {
    e.preventDefault();
    setShowTimeExtDialog(false);
    setTimesSel({
      left: timeFilterExt.left,
      right: timeFilterExt.right,
    });
    setTimeCurrSel("ext");
  };

  return (
    <>
      <UtilsBarWrapper>
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          {showDept && facilityID && (
            <UtilsBarSelect
              id="sel-dept"
              label="Abteilung"
              value={deptCurrSel}
              onChange={handleDeptChange}
            >
              {userFacilitiesByID[facilityID].departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>
                  {dept.name}
                </MenuItem>
              ))}
              <MenuItem key="all-depts" value="all-depts">
                Alle Abteilungen
              </MenuItem>
            </UtilsBarSelect>
          )}
          {showPools && facilityID && (
            <UtilsBarSelect
              id="sel-pool"
              label="Pool"
              value={poolCurrSel}
              onChange={handlePoolChange}
            >
              {userFacilitiesByID[facilityID].pools.map((pool) => (
                <MenuItem key={pool.id} value={pool.id}>
                  {pool.title}
                </MenuItem>
              ))}
              <MenuItem key="all-pools" value="all-pools">
                Alle Pools
              </MenuItem>
            </UtilsBarSelect>
          )}
          {showJiMs && facilityID && (
            <UtilsBarSelect
              id="sel-jim"
              label="JiM"
              value={jimCurrSel}
              onChange={handleJimChange}
            >
              {jimList.map((jim) => (
                <MenuItem key={jim.id} value={jim.id}>
                  {`${jim.first_name[0]}. ${jim.last_name}`}
                </MenuItem>
              ))}
              <MenuItem key="all-jims" value="all-jims">
                Alle JiMs
              </MenuItem>
            </UtilsBarSelect>
          )}
          {showTime && (
            <UtilsBarSelect
              id="select-time"
              value={timeCurrSel}
              label="Zeitraum"
              onChange={handleTimeChange}
            >
              <MenuItem key="current" value="current">
                {past
                  ? timeFilterLibPast.current.label
                  : timeFilterLibFuture.current.label}
              </MenuItem>
              <MenuItem key="thisMonth" value="thisMonth">
                {past
                  ? timeFilterLibPast.thisMonth.label
                  : timeFilterLibFuture.thisMonth.label}
              </MenuItem>
              <MenuItem key="nextMonth" value="nextMonth">
                {past
                  ? timeFilterLibPast.nextMonth.label
                  : timeFilterLibFuture.nextMonth.label}
              </MenuItem>
              <MenuItem key="open-ext-dialog" value="open-ext-dialog">
                erweitert...
              </MenuItem>
              {timeCurrSel === "ext" && (
                <MenuItem key="ext" value="ext" disabled>
                  {`${formatDE(timeFilterExt.left, "dd.MM.")} - ${formatDE(
                    timeFilterExt.right,
                    "dd.MM."
                  )}`}
                </MenuItem>
              )}
            </UtilsBarSelect>
          )}
          {customSlot && customSlot}
        </Grid>
        {btn && <BtnWrapper>{btn}</BtnWrapper>}
      </UtilsBarWrapper>
      <BtnTxt
        sx={{ display: { sm: "none" }, alignSelf: "flex-end" }}
        onClick={() => setShowCollapse(() => !showCollapse)}
      >
        {showCollapse ? (
          <FontAwesomeIcon icon={faXmark} />
        ) : (
          <>
            <span>FILTER</span>
            {/* <IconWithMargin ml={1} icon={faFilter} /> */}
          </>
        )}
      </BtnTxt>
      {/* <div
        tw="flex sm:hidden print:hidden items-center text-prim-500 justify-end p-2"
        onClick={() => setShowCollapse(() => !showCollapse)}
      >
        {showCollapse ? (
          <CloseRounded tw="text-xl" />
        ) : (
          <>
            <span tw="text-sm font-bold tracking-wider">FILTER</span>
            <TuneRounded tw="ml-2 text-xl" />
          </>
        )}
      </div> */}
      <Collapse in={showCollapse} sx={{ px: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
        >
          {showDept && facilityID && (
            <UtilsBarSelect
              id="sel-dept"
              label="Abteilung"
              value={deptCurrSel}
              onChange={handleDeptChange}
            >
              {userFacilitiesByID[facilityID].departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>
                  {dept.name}
                </MenuItem>
              ))}
              <MenuItem key="all-depts" value="all-depts">
                Alle Abteilungen
              </MenuItem>
            </UtilsBarSelect>
          )}
          {showPools && facilityID && (
            <UtilsBarSelect
              id="sel-pool"
              label="Pool"
              value={poolCurrSel}
              onChange={handlePoolChange}
            >
              {userFacilitiesByID[facilityID].pools.map((pool) => (
                <MenuItem key={pool.id} value={pool.id}>
                  {pool.name}
                </MenuItem>
              ))}
              <MenuItem key="all-pools" value="all-pools">
                Alle Pools
              </MenuItem>
            </UtilsBarSelect>
          )}
          {showJiMs && facilityID && (
            <UtilsBarSelect
              id="sel-jim"
              label="JiM"
              value={jimCurrSel}
              onChange={handleJimChange}
            >
              {userFacilitiesByID[facilityID].users.map((user) => (
                <MenuItem key={user.user.id} value={user.user.id}>
                  {`${user.user.first_name[0]}. ${user.user.last_name}`}
                </MenuItem>
              ))}
              <MenuItem key="all-jims" value="all-jims">
                Alle JiMs
              </MenuItem>
            </UtilsBarSelect>
          )}
          {showTime && (
            <UtilsBarSelect
              id="select-time"
              value={timeCurrSel}
              label="Zeitraum"
              onChange={handleTimeChange}
            >
              <MenuItem key="current" value="current">
                {past
                  ? timeFilterLibPast.current.label
                  : timeFilterLibFuture.current.label}
              </MenuItem>
              <MenuItem key="thisMonth" value="thisMonth">
                {past
                  ? timeFilterLibPast.thisMonth.label
                  : timeFilterLibFuture.thisMonth.label}
              </MenuItem>
              <MenuItem key="nextMonth" value="nextMonth">
                {past
                  ? timeFilterLibPast.nextMonth.label
                  : timeFilterLibFuture.nextMonth.label}
              </MenuItem>
              <MenuItem key="open-ext-dialog" value="open-ext-dialog">
                erweitert...
              </MenuItem>
              {timeCurrSel === "ext" && (
                <MenuItem key="ext" value="ext" disabled>
                  {`${formatDE(timeFilterExt.left, "dd.MM.")} - ${formatDE(
                    timeFilterExt.right,
                    "dd.MM."
                  )}`}
                </MenuItem>
              )}
            </UtilsBarSelect>
          )}
        </Box>
        {/* <div tw="flex flex-col space-y-4 p-2 bg-white rounded-md shadow-md">
          {showDept && facilityID && (
            <UtilsBarSelect
              id="sel-dept"
              label="Abteilung"
              value={deptCurrSel}
              onChange={handleDeptChange}
            >
              {userFacilitiesByID[facilityID].departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>
                  {dept.name}
                </MenuItem>
              ))}
              <MenuItem key="all-depts" value="all-depts">
                Alle Abteilungen
              </MenuItem>
            </UtilsBarSelect>
          )}
          {showPools && facilityID && (
            <UtilsBarSelect
              id="sel-pool"
              label="Pool"
              value={poolCurrSel}
              onChange={handlePoolChange}
            >
              {userFacilitiesByID[facilityID].pools.map((pool) => (
                <MenuItem key={pool.id} value={pool.id}>
                  {pool.name}
                </MenuItem>
              ))}
              <MenuItem key="all-pools" value="all-pools">
                Alle Pools
              </MenuItem>
            </UtilsBarSelect>
          )}
          {showJiMs && facilityID && (
            <UtilsBarSelect
              id="sel-jim"
              label="JiM"
              value={jimCurrSel}
              onChange={handleJimChange}
            >
              {userFacilitiesByID[facilityID].users.map((user) => (
                <MenuItem key={user.user.id} value={user.user.id}>
                  {`${user.user.first_name[0]}. ${user.user.last_name}`}
                </MenuItem>
              ))}
              <MenuItem key="all-jims" value="all-jims">
                Alle JiMs
              </MenuItem>
            </UtilsBarSelect>
          )}
          {showTime && (
            <UtilsBarSelect
              id="select-time"
              value={timeCurrSel}
              label="Zeitraum"
              onChange={handleTimeChange}
            >
              <MenuItem key="current" value="current">
                {past
                  ? timeFilterLibPast.current.label
                  : timeFilterLibFuture.current.label}
              </MenuItem>
              <MenuItem key="thisMonth" value="thisMonth">
                {past
                  ? timeFilterLibPast.thisMonth.label
                  : timeFilterLibFuture.thisMonth.label}
              </MenuItem>
              <MenuItem key="nextMonth" value="nextMonth">
                {past
                  ? timeFilterLibPast.nextMonth.label
                  : timeFilterLibFuture.nextMonth.label}
              </MenuItem>
              <MenuItem key="open-ext-dialog" value="open-ext-dialog">
                erweitert...
              </MenuItem>
              {timeCurrSel === "ext" && (
                <MenuItem key="ext" value="ext" disabled>
                  {`${formatDE(timeFilterExt.left, "dd.MM.")} - ${formatDE(
                    timeFilterExt.right,
                    "dd.MM."
                  )}`}
                </MenuItem>
              )}
            </UtilsBarSelect>
          )}
        </div> */}
      </Collapse>
      {/* <JimDialog
        open={showTimeExtDialog}
        handleClose={() => setShowTimeExtDialog(false)}
        title="Zeitraum"
        closable
      >
        <LocalizationProvider dateAdapter={DateAdapter} locale={deLocale}>
          <DatePicker
            renderInput={(params) => <TextField label="von" {...params} />}
            cancelText="abbrechen"
            value={timeFilterExt.left}
            onChange={(date) => handleStartChange(date)}
            minDate={past ? undefined : new Date()}
            maxDate={past ? new Date() : undefined}
            format="eee, dd. MMM yyyy"
          />
          <DatePicker
            renderInput={(params) => <TextField label="bis" {...params} />}
            cancelText="abbrechen"
            value={timeFilterExt.right}
            onChange={(date) => handleEndChange(date)}
            minDate={past ? undefined : new Date()}
            maxDate={past ? new Date() : undefined}
            format="eee, dd. MMM yyyy"
          />
        </LocalizationProvider>
        <JimButton
          variant="primary"
          onClick={handleTimeExtChange}
          tw="self-start"
        >
          anwenden
        </JimButton>
      </JimDialog> */}
    </>
  );
};

export default UtilsBar;
