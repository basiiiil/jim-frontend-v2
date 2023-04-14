import * as React from "react";
import { styled } from "@mui/material/styles";
import { JobInstanceType } from "../../../types/job-instance";
import { AssignmentIndOutlined } from "@mui/icons-material";

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

type ContentLeftProps = {
  status: string;
  children: React.ReactNode;
};

const ContentLeft = ({ status, children }: ContentLeftProps) => (
  <div className="flex align-center">
    <AssignmentIndOutlined fontSize="small" sx={{ mr: 2 }} />
    {children}
  </div>
);

// type WorkerTileWrapperInnerProps = {
//   isYellow: boolean;
// };
// const WorkerTileWrapperInner = styled("div")<WorkerTileWrapperInnerProps>(
//   ({ theme, isYellow }) => ({
//     display: "flex",
//     flexDirection: "column",
//     color: isYellow ? theme.palette.warning.main : theme.palette.error.main,
//     [theme.breakpoints.up("sm")]: {
//       flexDirection: "row",
//     },
//   })
// );

const getContentRightText = (
  isOverlapError: boolean,
  isAlreadyAvailable: boolean
) => {
  if (isOverlapError) {
    return <div>Während dieses Jobs bist du schon im Einsatz</div>;
  } else if (isAlreadyAvailable) {
    return <div className="font-semibold">Verfügbarkeit bereits gemeldet!</div>;
  }
};

const WorkerTileNEW = ({
  isAlreadyAvailable,
  jobInst,
  handleClickOnWorkerTile,
  isOverlapError,
  ind,
}: WorkerTileProps) => {
  return (
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
      <div className="flex flex-col sm:flex-row">
        <ContentLeft status={jobInst.status}>
          {jobInst.status === "OPEN" && "noch nicht besetzt"}
          {jobInst.status === "ASSIGNED" &&
            `${jobInst.worker.first_name} ${jobInst.worker.last_name}`}
          {jobInst.status === "ASSIGNED_SWAP_REQUEST" &&
            `${jobInst.worker.first_name} ${jobInst.worker.last_name} (Tausch angefragt)`}
        </ContentLeft>
        {ind === 0 && (
          <ContentRight>
            {isOverlapError || isAlreadyAvailable ? (
              getContentRightText(isOverlapError, isAlreadyAvailable)
            ) : (
              <BtnRectOutlined
                action={jobInst.instant_book ? "instantbook" : "cancel"}
              >
                {jobInst.instant_book
                  ? "Sofort Buchen!"
                  : "Verfügbarkeit melden!"}
              </BtnRectOutlined>
            )}
          </ContentRight>
        )}
      </div>
    </WorkerTileWrapper>
  );
};

export default WorkerTileNEW;
