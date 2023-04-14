import { styled } from "@mui/material/styles";
import { display } from "@mui/system";
import { areIntervalsOverlapping } from "date-fns";
import * as React from "react";
import { AvailabilityType } from "../../../types/availability";
import { JobInstanceType } from "../../../types/job-instance";
import { dummyOpenJobInstances } from "../../../utils/dummy-data";
import { UserDataContext } from "../../../utils/UserDataProvider";
import { formatDE } from "../../../utils/util-functions";
import JobTileDateArea from "./JobTileDateArea";
import JobTileDetailsArea from "./JobTileDetailsArea";
import WorkerTileAssigned from "./WorkerTileAssigned";
import WorkerTileOpen from "./WorkerTileOpen";

interface RefetchVarsIF {
  startsAfter?: number;
  endsBefore?: number;
  pool?: string[];
  status?: string;
}

type JobTileProps = {
  jobInst: JobInstanceType;
  withDate: boolean;
  userJobsArr: JobInstanceType[];
  userAvailsArr: AvailabilityType[];
  refetchVars: RefetchVarsIF;
  activateJobsWithUserCounter: () => void;
};

const JOBINSTANCES_BY_GROUP_ID = {
  loading: false,
  error: false,
  data: {
    listJobInstances: dummyOpenJobInstances.listJobInstances.filter(
      (jobInst) => jobInst.group_id === "job-instance-group-id-1"
    ),
  },
};

// const JOBINSTANCES_BY_GROUP_ID = gql`query ListJobInstancesByGroupID($group_id: String) {
//     listJobInstances(group_id: $group_id) {
//       id
//       status
//       worker {
//         id
//         first_name
//         last_name
//       }
//       group_id
//       instant_book
//     }
//   }`;

function JobTile({
  jobInst,
  withDate,
  userJobsArr,
  userAvailsArr,
  refetchVars,
  activateJobsWithUserCounter,
}: JobTileProps) {
  const { userID } = React.useContext(UserDataContext);
  // const {
  //   data: jobGroupData,
  //   loading: jobGroupLoading,
  //   error: jobGroupError,
  // } = useQuery(JOBINSTANCES_BY_GROUP_ID, {
  //   variables: { group_id: jobInst.group_id },
  // });
  const {
    data: jobGroupData,
    loading: jobGroupLoading,
    error: jobGroupError,
  } = JOBINSTANCES_BY_GROUP_ID;
  // const [
  //   createSingleAvail,
  //   { loading: createAvailLoading, error: createAvailError },
  // ] = useMutation(CREATE_AVAILABILITIES);
  // const [acceptJobInstance, { loading: acceptLoading, error: acceptError }] =
  //   useMutation(ACCEPT_JOBINSTANCE);
  // const [swapJobInstance, { loading: swapLoading, error: swapError }] =
  //   useMutation(SWAP_JOBINSTANCE);
  const [showJobDetails, setShowJobDetails] = React.useState(false);
  const [showCreateAvailDialog, setShowCreateAvailDialog] =
    React.useState(false);
  const [showInstantBookDialog, setShowInstantBookDialog] =
    React.useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = React.useState(false);
  const [isAlreadyAvailable, setIsAlreadyAvailable] = React.useState(false);
  const [isOverlapError, setIsOverlapError] = React.useState(false);
  const [jobInstSelected, setJobInstSelected] = React.useState(jobInst);

  React.useEffect(() => {
    if (
      jobGroupData &&
      jobGroupData.listJobInstances.filter(
        (jobInstInGroup) => jobInstInGroup?.worker?.id === userID
      ).length !== 0
    ) {
      activateJobsWithUserCounter();
    }
  }, [jobGroupData]);

  React.useEffect(() => {
    let res = false;
    for (let i = 0; i < userAvailsArr.length; i += 1) {
      if (
        userAvailsArr[i].start_time <= jobInst.start_time &&
        userAvailsArr[i].end_time >= jobInst.end_time
      ) {
        res = true;
      }
    }
    setIsAlreadyAvailable(res);
  }, [userAvailsArr]);

  React.useEffect(() => {
    let res = false;
    for (let i = 0; i < userJobsArr.length; i += 1) {
      if (
        areIntervalsOverlapping(
          { start: jobInst.start_time, end: jobInst.end_time },
          {
            start: new Date(userJobsArr[i].start_time),
            end: new Date(userJobsArr[i].end_time),
          }
        )
      ) {
        res = true;
      }
    }
    setIsOverlapError(res);
  }, [userJobsArr]);

  const handleClickOnTile = (e) => {
    e.stopPropagation();
    setShowJobDetails(true);
  };

  const handleCreate = () => {
    setShowCreateAvailDialog(false);
    // createSingleAvail({
    //   variables: {
    //     availabilities: [
    //       {
    //         start_time: jobInst.start_time,
    //         end_time: jobInst.end_time,
    //         instant_book: true,
    //       },
    //     ],
    //   },
    //   refetchQueries: [
    //     {
    //       query: GET_USER_INFO,
    //       variables: { startsAfter: startOfDay(new Date()).getTime() },
    //     },
    //   ],
    // }).then(() => setShowSuccessDialog(true));
  };

  const handleClickOnWorkerTile = (jobInstThis: JobInstanceType) => {
    setJobInstSelected(jobInstThis);
    if (!isOverlapError) {
      if (jobInst.instant_book) {
        setShowInstantBookDialog(true);
      } else if (!isAlreadyAvailable) {
        setShowCreateAvailDialog(true);
      }
    }
  };

  const handleInstantBook = () => {
    setShowInstantBookDialog(false);
    // if (jobInstSelected.status === "OPEN") {
    //   acceptJobInstance({
    //     variables: { jobInstance: jobInstSelected.id, worker: userID },
    //     refetchQueries: [
    //       {
    //         query: GET_USER_INFO,
    //         variables: { startsAfter: startOfDay(new Date()).getTime() },
    //       },
    //       {
    //         query: JOBINSTANCES_QUERY,
    //         variables: refetchVars,
    //       },
    //       {
    //         query: JOBINSTANCES_BY_GROUP_ID,
    //         variables: { group_id: jobInstSelected.group_id },
    //       },
    //     ],
    //   }).then(() => setShowSuccessDialog(true));
    // } else if (jobInstSelected.status === "ASSIGNED_SWAP_REQ") {
    //   swapJobInstance({
    //     variables: { jobInstance: jobInstSelected.id, worker: userID },
    //     refetchQueries: [
    //       {
    //         query: GET_USER_INFO,
    //         variables: { startsAfter: startOfDay(new Date()).getTime() },
    //       },
    //       {
    //         query: JOBINSTANCES_QUERY,
    //         variables: refetchVars,
    //       },
    //       {
    //         query: JOBINSTANCES_BY_GROUP_ID,
    //         variables: { group_id: jobInstSelected.group_id },
    //       },
    //     ],
    //   }).then(() => setShowSuccessDialog(true));
    // }
  };

  if (jobGroupLoading)
    return (
      <div tw="my-4">
        <LoadingTile />
      </div>
    );

  return jobGroupData &&
    jobGroupData.listJobInstances.filter(
      (jobInstInGroup) => jobInstInGroup?.worker?.id === userID
    ).length !== 0 ? null : (
    <>
      <div css={{ display: "flex" }}>
        <JobTileDateArea jobInst={jobInst} withDate={withDate} />
        {/* JobDetails */}
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            opacilty: isOverlapError ? 0.7 : 1,
          }}
        >
          <JobTileDetailsArea
            jobInst={jobInst}
            handleClickOnTile={handleClickOnTile}
          />
          {jobGroupData.listJobInstances.filter(
            (jobInstInGroup) =>
              jobInstInGroup.status === "OPEN" && !jobInstInGroup.worker
          ).length > 0 ? (
            <>
              {jobGroupData.listJobInstances
                .filter(
                  (jobInstInGroup) =>
                    jobInstInGroup.status === "OPEN" && !jobInstInGroup.worker
                )
                .map((jobInstOpen, ind) => (
                  <WorkerTileOpen
                    isAlreadyAvailable={isAlreadyAvailable}
                    jobInst={jobInstOpen}
                    handleClickOnWorkerTile={() =>
                      handleClickOnWorkerTile(jobInstOpen)
                    }
                    isOverlapError={isOverlapError}
                    ind={ind}
                  />
                ))}
              {jobGroupData.listJobInstances
                .filter((jobInstInGroup) => jobInstInGroup.worker)
                .map((jobInstInGroup) => (
                  <WorkerTileAssigned
                    jobInst={jobInstInGroup}
                    userID={userID}
                  />
                ))}
            </>
          ) : (
            <>
              {jobGroupData.listJobInstances
                .filter(
                  (jobInstInGroup) =>
                    jobInstInGroup.status === "ASSIGNED_SWAP_REQ" &&
                    jobInstInGroup.worker
                )
                .map((jobInstWithSwapReq) => (
                  <WorkerTile
                    tw="cursor-pointer"
                    onClick={() => handleClickOnWorkerTile(jobInstWithSwapReq)}
                  >
                    <div tw="flex flex-col sm:flex-row text-transparent">
                      <div tw="flex items-center space-x-2 text-green-400">
                        <FaExchangeAlt tw="mr-2 text-base text-green-400" />
                        <div tw="font-semibold text-green-400">{`${jobInstWithSwapReq.worker.first_name} ${jobInstWithSwapReq.worker.last_name} (Tausch angefragt)`}</div>
                      </div>
                      <div tw="flex items-center space-x-2">
                        <AssignmentIndTwoTone tw="text-lg" />
                        {isOverlapError ? (
                          <div tw="rounded-md text-red-500 border-2 border-white">
                            Während dieses Jobs bist du schon im Einsatz
                          </div>
                        ) : (
                          <>
                            {jobInstWithSwapReq.instant_book ? (
                              <div tw="font-semibold rounded-md border-2 border-blue-400 px-2 bg-gradient-to-bl from-green-400 to-blue-500 bg-clip-text text-transparent select-none">
                                Einsatz übernehmen
                              </div>
                            ) : (
                              <>
                                {isAlreadyAvailable ? (
                                  <div tw="text-yellow-500 font-semibold">
                                    Verfügbarkeit bereits gemeldet!
                                  </div>
                                ) : (
                                  <div tw="font-semibold rounded-md text-red-500 border-2 border-white">
                                    jetzt Verfügbarkeit melden!
                                  </div>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </WorkerTile>
                ))}
              {jobGroupData.listJobInstances
                .filter(
                  (jobInstInGroup) =>
                    jobInstInGroup.status === "ASSIGNED" &&
                    jobInstInGroup.worker
                )
                .map((jobInstInGroup) => (
                  <WorkerTile>
                    <div
                      css={[
                        tw`flex items-center font-semibold`,
                        jobInstInGroup.worker.id === userID
                          ? tw`text-blue-400`
                          : tw`text-green-500`,
                      ]}
                    >
                      <AssignmentIndTwoTone tw="mr-2 text-lg" />
                      <div tw="font-semibold">{`${jobInstInGroup.worker.first_name} ${jobInstInGroup.worker.last_name}`}</div>
                    </div>
                  </WorkerTile>
                ))}
            </>
          )}

          {/* {jobGroupLoading && (
                <WorkerTile>
                  <Skeleton width={140} />
                </WorkerTile>
              )} */}
        </div>
      </div>
      <JimDialog
        open={showJobDetails}
        handleClose={() => setShowJobDetails(false)}
        title={jobInst.job.title}
        closable
        tw="space-y-4"
      >
        <div tw="flex items-center">
          <ScheduleTwoTone tw="mr-2 text-lg" />
          {`${formatDE(
            new Date(jobInst.start_time),
            "eee, dd.MM.yy · HH:mm"
          )} - ${formatDE(
            new Date(jobInst.end_time),
            "HH:mm"
          )} Uhr (${hoursToHoursMin(jobInst.length)})`}
        </div>
        <div tw="flex items-center">
          <InfoTwoTone tw="mr-2 text-lg" />
          {jobInst.description}
        </div>
      </JimDialog>
      <JimDialog
        open={showCreateAvailDialog}
        handleClose={() => setShowCreateAvailDialog(false)}
        title="Verfügbarkeit melden"
        closable
        tw="w-80 max-w-full"
      >
        <div tw="flex flex-col items-center">
          <div>Du bist also am</div>
          <div tw="font-semibold">{`${formatDE(
            new Date(jobInst.start_time),
            "eee, dd.MM.yy 'von 'HH:mm"
          )} bis ${formatDE(new Date(jobInst.end_time), "HH:mm")} Uhr`}</div>
          <div>für den gewählten Einsatz verfügbar?</div>
        </div>
        <JimButton tw="self-center" variant="primary" onClick={handleCreate}>
          jetzt melden
        </JimButton>
      </JimDialog>
      <JimDialog
        open={showInstantBookDialog}
        handleClose={() => setShowInstantBookDialog(false)}
        title="Sofort buchen"
        closable
        tw="w-80 max-w-full"
      >
        <div tw="flex flex-col items-center">
          <div>Du möchtest den Einsatz</div>
          <div tw="font-semibold">{jobInst.job.title}</div>
          <div>am</div>
          <div tw="font-semibold">{`${formatDE(
            new Date(jobInst.start_time),
            "eee, dd.MM.yy 'von 'HH:mm"
          )} bis ${formatDE(new Date(jobInst.end_time), "HH:mm")} Uhr`}</div>
          <div>also jetzt verbindlich buchen?</div>
        </div>
        <JimButton
          tw="self-center"
          variant="primary"
          onClick={handleInstantBook}
        >
          jetzt buchen
        </JimButton>
      </JimDialog>
      <JimDialog
        open={showSuccessDialog}
        handleClose={() => setShowSuccessDialog(false)}
        tw="justify-center items-center space-y-4 w-64"
      >
        <div tw="flex text-xl tracking-wide">
          {jobInst.instant_book ? "Job gebucht!" : "Verfügbarkeit erstellt!"}
        </div>
        <div tw="text-6xl text-green-600">
          <CheckCircleOutlineRounded fontSize="inherit" />
        </div>
      </JimDialog>
      <LoadingDialog
        open={createAvailLoading || acceptLoading || swapLoading}
      />
      {(createAvailError || acceptError || jobGroupError || swapError) && (
        <ErrorDialog />
      )}
    </>
  );
}
