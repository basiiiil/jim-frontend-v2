import React, { useContext, useEffect, useState } from "react";
import { addDays } from "date-fns";
import { dummyUserInfo, dummyOpenJobInstances } from "../../utils/dummy-data";
import { JobInstanceType } from "../../types/job-instance";
import { HeadProps } from "gatsby";
import ContentWrapper from "../../layout/ContentWrapper";
import UtilsBar from "../../layout/UtilsBar";
import BtnTxt from "../../components/utils/BtnTxt";
import { PageTitleContext } from "../../utils/PageTitleProvider";

interface DurationType {
  left: Date;
  right: Date;
}

const GET_USER_INFO = {
  loading: false,
  data: dummyUserInfo,
};

const JOBINSTANCES_QUERY = {
  data: dummyOpenJobInstances,
  loading: false,
};

type JobInstsByGroupIDType = {
  [key: string]: JobInstanceType;
};

const JobsFind = () => {
  const { pageTitle, setPageTitle } = useContext(PageTitleContext);
  useEffect(() => {
    setPageTitle("Einsätze finden");
  });
  const [timesSel, setTimesSel] = useState<DurationType>({
    left: new Date(),
    right: addDays(new Date(), 30),
  });

  const { data: userInfoData, loading: userInfoLoading } = GET_USER_INFO;
  //   const { data: userInfoData, loading: userInfoLoading } = useQuery(
  //     GET_USER_INFO,
  //     {
  //       variables: { startsAfter: startOfDay(new Date()).getTime() },
  //     }
  //   );
  const [jobInstsByGroupID, setJobInstsByGroupID] = useState({});
  //   const [findOpenJobInstances, { data: jobInstData, loading: jobInstLoading }] =
  //     useLazyQuery(JOBINSTANCES_QUERY);
  const { data: jobInstData, loading: jobInstLoading } = JOBINSTANCES_QUERY;
  const [jobsWithUserCounter, setJobsWithUserCounter] = useState(0);
  const [noJobsAvail, setNoJobsAvail] = useState(false);

  //   useEffect(() => {
  //     setJobsWithUserCounter(0);
  //     if (userInfoData) {
  //       findOpenJobInstances({
  //         variables: {
  //           startsAfter: timesSel.left.getTime(),
  //           endsBefore: timesSel.right.getTime(),
  //           status: ["OPEN", "ASSIGNED_SWAP_REQ"],
  //         },
  //       });
  //     }
  //   }, [userInfoData, timesSel]);

  useEffect(() => {
    setJobsWithUserCounter(0);
    const jobInstObj: JobInstsByGroupIDType = {};
    if (jobInstData && jobInstData.listJobInstances[0]) {
      jobInstData.listJobInstances.forEach((jobInst) => {
        if (!jobInstObj[jobInst.group_id]) {
          jobInstObj[jobInst.group_id] = jobInst;
        }
      });
    }
    setJobInstsByGroupID(jobInstObj);
  }, [jobInstData]);

  const activateJobsWithUserCounter = () => {
    if (
      jobInstData &&
      jobsWithUserCounter + 1 >= Object.keys(jobInstsByGroupID).length
    ) {
      setNoJobsAvail(true);
    }
    setJobsWithUserCounter(jobsWithUserCounter + 1);
  };

  return (
    <>
      <UtilsBar showTime setTimesSel={setTimesSel} />
      <ContentWrapper>
        {/* <UtilsBar showTime setTimesSel={setTimesSel} />
      <ContentWithUtilsBar>
        {Object.keys(jobInstsByGroupID)[0] &&
          Object.keys(jobInstsByGroupID).map((groupID, ind) => (
            <JobTile
              jobInst={jobInstsByGroupID[groupID]}
              withDate={
                ind === 0 ||
                (ind > 0 &&
                  differenceInCalendarDays(
                    new Date(jobInstsByGroupID[groupID].start_time),
                    new Date(
                      jobInstsByGroupID[
                        Object.keys(jobInstsByGroupID)[ind - 1]
                      ].start_time
                    )
                  ) > 0)
              }
              userJobsArr={
                userInfoData ? userInfoData.getUser.accepted_jobs : []
              }
              userAvailsArr={
                userInfoData ? userInfoData.getUser.availabilities : []
              }
              refetchVars={{
                startsAfter: timesSel.left.getTime(),
                endsBefore: timesSel.right.getTime(),
              }}
              activateJobsWithUserCounter={activateJobsWithUserCounter}
            />
          ))}
        {(noJobsAvail ||
          (!jobInstLoading &&
            jobInstData &&
            !jobInstData.listJobInstances[0])) && (
          <TilePrim>Aktuell sind keine Einsätze verfügbar.</TilePrim>
        )}
        {(jobInstLoading || userInfoLoading) && <LoadingTile />}
      </ContentWithUtilsBar> */}
      </ContentWrapper>
    </>
  );
};

export default JobsFind;

export function Head({ location }: HeadProps) {
  return (
    <>
      <meta charSet="utf-8" />
      <title>JiM - Jobs finden</title>
      <link
        rel="canonical"
        href={`https://jim.morrowmed.de${location.pathname}`}
      />
      <meta
        name="Description"
        content="JiM - Jobs in Medicine vermittelt Nebenjobs in Kliniken und Arztpraxen an Medizin Studierende in Würzburg und Deutschland"
      />
    </>
  );
}
