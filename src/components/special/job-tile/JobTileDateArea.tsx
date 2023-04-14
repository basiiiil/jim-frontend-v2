import { styled } from "@mui/material/styles";
import { JobInstanceType } from "../../../types/job-instance";
import { formatDE } from "../../../utils/util-functions";

type DateAreaProps = {
  jobInst: JobInstanceType;
  withDate?: boolean;
};

const DateAreaWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  width: theme.spacing(10),
  color: theme.palette.primary.main,
  opacity: 0.7,
}));

const JobTileDateArea = ({ jobInst, withDate }: DateAreaProps) => (
  <DateAreaWrapper>
    {withDate && (
      <div
        css={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <div css={{ fontSize: "1.25rem", fontWeight: 700 }}>
          {formatDE(new Date(jobInst.start_time), "dd")}
        </div>
        <div css={{ fontSize: ".75rem", letterSpacing: "-0.05rem" }}>
          {formatDE(new Date(jobInst.start_time), "LLL").toUpperCase()}
        </div>
      </div>
    )}
  </DateAreaWrapper>
);

export default JobTileDateArea;
