import * as React from "react";
import { UserDataContext } from "./UserDataProvider";

interface WithRolesProps {
  group: "ADMIN" | "WORKER" | "EMPLOYER";
}

// const withRoles = <P extends object>(Component: React.ComponentType<P>) =>
//   class WithRoles extends React.Component<P & WithRolesProps> {
//     render() {
//       const { group, ...props } = this.props;
//       const { roles } = React.useContext(UserDataContext);

//       return roles.includes(group) || roles.includes("ADMIN") ? (
//         <Component {...(props as P)} />
//       ) : (
//         <div>
//           Für diese Funktion fehlen dir die nötigen Berechtigungen. Bitte wende
//           dich an unseren Support.
//         </div>
//       );
//     }
//   };

const withRoles =
  <P extends object>(Component: React.ComponentType<P>) =>
  ({ group, ...props }: WithRolesProps) => {
    const { roles } = React.useContext(UserDataContext);

    return roles.includes(group) || roles.includes("ADMIN") ? (
      <Component {...(props as P)} />
    ) : (
      <div>
        Für diese Funktion fehlen dir die nötigen Berechtigungen. Bitte wende
        dich an unseren Support.
      </div>
    );
  };

export default withRoles;
