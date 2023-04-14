import React from "react";
import { styled } from "@mui/material/styles";
import { PageProps } from "gatsby";
import { flatten } from "lodash";
import { useEffect, useState } from "react";
import LoadingBouncer from "../components/utils/LoadingBouncer";
import { DepartmentType } from "../types/department";
import { FacilityType } from "../types/facility";
import { dummyUser } from "./dummy-data";

const GET_USER_ROLES = {
  data: dummyUser,
  loading: false,
  error: null,
};

type FacilitiesByIDType = {
  [key: string]: FacilityType;
};

type DeptsByIDType = {
  [key: string]: DepartmentType;
};

interface UserDataIF {
  roles: string[];
  userID: string | null;
  userCal: string | null;
  userFacilitiesByID: FacilitiesByIDType;
  userFacilitiesList: FacilityType[];
  userDeptsByID: DeptsByIDType;
  userDeptsList: DepartmentType[];
}

const ErrorPageWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
});

export const UserDataContext = React.createContext<UserDataIF>({
  roles: [],
  userID: null,
  userCal: null,
  userFacilitiesByID: {},
  userFacilitiesList: [],
  userDeptsByID: {},
  userDeptsList: [],
});

function UserDataProvider({ children }: PageProps) {
  const [roles, setRoles] = useState<string[]>([]);
  const [userID, setUserID] = useState<string | null>(null);
  const [userCal, setUserCal] = useState<string | null>(null);
  const [userFacilitiesByID, setUserFacilitiesByID] =
    useState<FacilitiesByIDType>({});
  const [userFacilitiesList, setUserFacilitiesList] = useState<FacilityType[]>(
    []
  );
  const [userDeptsByID, setUserDeptsByID] = useState<DeptsByIDType>({});
  const [userDeptsList, setUserDeptsList] = useState<DepartmentType[]>([]);
  const { data, loading, error } = GET_USER_ROLES;

  useEffect(() => {
    if (data && data.getUser) {
      setRoles(data.getUser.roles);
      setUserID(data.getUser.id);
      setUserCal(data.getUser.calendar);
      if (data.getUser.facilities && data.getUser.facilities[0]) {
        setUserDeptsList(
          flatten(
            data.getUser.facilities.map((facility) => facility.departments)
          )
        );
        setUserFacilitiesList(data.getUser.facilities);
        const facilitiesByID: FacilitiesByIDType = {};
        data.getUser.facilities.forEach((facility) => {
          facilitiesByID[facility.id] = facility;
        });
        setUserFacilitiesByID(facilitiesByID);
        const deptsByID: DeptsByIDType = {};
        data.getUser.facilities.forEach((facility) => {
          facility.departments.forEach((dept) => {
            deptsByID[dept.id] = dept;
          });
        });
        setUserDeptsByID(deptsByID);
      }
    }
  }, [data]);

  if (loading) return <LoadingBouncer size="md" fullscreen />;

  if (error)
    return (
      <ErrorPageWrapper>
        {/* <SupportTile text="Leider ist etwas schief gelaufen. Bitte kontaktiere unseren Support." /> */}
        <div>
          Leider ist etwas schief gelaufen. Bitte kontaktiere unseren Support.
        </div>
      </ErrorPageWrapper>
    );

  return (
    <UserDataContext.Provider
      value={{
        roles,
        userID,
        userCal,
        userFacilitiesByID,
        userFacilitiesList,
        userDeptsByID,
        userDeptsList,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export default UserDataProvider;
// export default withAuthenticationRequired(UserRolesProvider)
