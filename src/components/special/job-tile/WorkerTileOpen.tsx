import { AssignmentIndOutlined } from "@mui/icons-material";
import { styled, useTheme } from "@mui/material/styles";
import { display } from "@mui/system";
import { JobInstanceType } from "../../../types/job-instance";
import BtnRectOutlined from "../../utils/BtnRectOutlined";

type WorkerTileProps = {
  isAlreadyAvailable: boolean;
  jobInst: JobInstanceType;
  handleClickOnWorkerTile: (
    event: React.MouseEvent<HTMLDivElement>,
    jobInst: JobInstanceType
  ) => void;
  isOverlapError: boolean;
  ind: number;
};

const WorkerTileWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  marginTop: theme.spacing(1),
}));

type WorkerTileWrapperInnerProps = {
  isYellow: boolean;
};
const WorkerTileWrapperInner = styled("div")<WorkerTileWrapperInnerProps>(
  ({ theme, isYellow }) => ({
    display: "flex",
    flexDirection: "column",
    color: isYellow ? theme.palette.warning.main : theme.palette.error.main,
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  })
);

const WorkerTileIconWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const WorkerTileOpen = ({
  isAlreadyAvailable,
  jobInst,
  handleClickOnWorkerTile,
  isOverlapError,
  ind,
}: WorkerTileProps) => (
  <WorkerTileWrapper
    css={{
      cursor:
        (!isAlreadyAvailable || jobInst.instant_book) &&
        !isOverlapError &&
        ind === 0
          ? "pointer"
          : ":default",
    }}
    onClick={(e) => handleClickOnWorkerTile(e, jobInst)}
  >
    <WorkerTileWrapperInner
      isYellow={isAlreadyAvailable && !jobInst.instant_book}
    >
      <WorkerTileIconWrapper>
        <AssignmentIndOutlined fontSize="small" sx={{ mr: 2 }} />
        <div>noch nicht besetzt</div>
      </WorkerTileIconWrapper>
      {ind === 0 && (
        <div css={{ display: "flex", alignItems: "center" }}>
          <AssignmentIndOutlined
            fontSize="small"
            sx={{ color: "transparent" }}
          />
          {isOverlapError ? (
            <div>Während dieses Jobs bist du schon im Einsatz</div>
          ) : (
            <>
              {isAlreadyAvailable ? (
                <div
                  css={{
                    fontWeight: 700,
                  }}
                >
                  Verfügbarkeit bereits gemeldet!
                </div>
              ) : (
                <BtnRectOutlined
                  action={jobInst.instant_book ? "instantbook" : "cancel"}
                >
                  {jobInst.instant_book
                    ? "Sofort Buchen!"
                    : "Verfügbarkeit melden!"}
                </BtnRectOutlined>
              )}
            </>
          )}
        </div>
      )}
    </WorkerTileWrapperInner>
  </WorkerTileWrapper>
);

export default WorkerTileOpen;
