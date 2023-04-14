import {
  InfoOutlined,
  LocationOnOutlined,
  ScheduleOutlined,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { JobInstanceType } from "../../../types/job-instance";
import { formatDE } from "../../../utils/util-functions";

type DetailsAreaProps = {
  handleClickOnTile: (event: React.MouseEvent<HTMLDivElement>) => void;
  jobInst: JobInstanceType;
};

const DetailsAreaWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  marginTop: theme.spacing(4),
  border: "1px solid silver",
  cursor: "pointer",
}));

const DetailsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
}));

const JobTileDetailsArea = ({
  handleClickOnTile,
  jobInst,
}: DetailsAreaProps) => (
  <DetailsAreaWrapper onClick={handleClickOnTile}>
    <Typography variant="h3">{jobInst.job.title}</Typography>
    <DetailsGrid>
      <div css={{ display: "flex", alignItems: "center" }}>
        <ScheduleOutlined fontSize="small" sx={{ mr: 2 }} />
        {`${formatDE(new Date(jobInst.start_time), "HH:mm")} - ${formatDE(
          new Date(jobInst.end_time),
          "HH:mm"
        )} Uhr`}
      </div>
      <div tw="flex items-center">
        <LocationOnOutlined fontSize="small" sx={{ mr: 2 }} />
        {`${jobInst.department.facility.name} - ${jobInst.department.name}`}
      </div>
      <div tw="flex items-center">
        <InfoOutlined fontSize="large" sx={{ mr: 2 }} />
        {jobInst.description}
      </div>
    </DetailsGrid>
  </DetailsAreaWrapper>
);

export default JobTileDetailsArea;
