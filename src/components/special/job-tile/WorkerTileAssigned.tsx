import { AssignmentIndOutlined } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { display } from "@mui/system";
import { JobInstanceType } from "../../../types/job-instance";

type WorkerTileAssignedProps = {
  jobInst: JobInstanceType;
  userID: string | null;
};

type WorkerTileWrapperProps = {
  workerIsUser: boolean;
};
const WorkerTileWrapper = styled("div")<WorkerTileWrapperProps>(
  ({ theme, workerIsUser }) => ({
    display: "flex",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    color: workerIsUser
      ? theme.palette.jimgray.main
      : theme.palette.success.main,
  })
);

const WorkerTileWrapperInner = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  color: "transparent",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

const WorkerTileAssigned = ({ jobInst, userID }: WorkerTileAssignedProps) => (
  <WorkerTileWrapper workerIsUser={jobInst.worker.id === userID}>
    <WorkerTileWrapperInner>
      <AssignmentIndOutlined fontSize="small" sx={{ mr: 2 }} />
      <div
        css={{ fontWeight: 700 }}
      >{`${jobInst.worker.first_name} ${jobInst.worker.last_name}`}</div>
    </WorkerTileWrapperInner>
  </WorkerTileWrapper>
);

export default WorkerTileAssigned;
