import {
  faBriefcase,
  faCalendarCheck,
  faFaceDizzy,
  faMagnifyingGlass,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { userPagesArr } from "../utils/pagesLists";

type NavItemProps = {
  selected: boolean;
};

const NavMobileWrapper = styled("div")(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const NavMobileWrapperInner = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  //   justifyContent: "space-around",
  padding: theme.spacing(1),
  // backgroundColor: theme.palette.primary.main,
  backgroundColor: "white",
}));

const NavItem = styled("div")<NavItemProps>(({ theme, selected }) => ({
  display: "flex",
  flexFlow: "column nowrap",
  width: "100%",
  padding: theme.spacing(1),
  borderRadius: theme.spacing(2),
  alignItems: "center",
  justifyContent: "center",
  //   color: theme.palette.primary.main,
  color: selected ? theme.palette.primary.main : "darkgray",
  // color: selected ? theme.palette.primary.light : "white",
  // color: "white",
  cursor: "pointer",
  // backgroundColor: selected ? "rgba(255, 255, 255, 0.8)" : "transparent",
  // backgroundColor: selected ? theme.palette.primary.dark : "transparent",
  transition: "all 100ms cubic-bezier(0.4, 0, 0.2, 1)",
}));

const NavMobile = function () {
  const [pageActive, setPageActive] = React.useState("jobs-user");

  return (
    <NavMobileWrapper>
      <NavMobileWrapperInner>
        {userPagesArr.map((page) => (
          <NavItem
            onClick={() => setPageActive(page.path)}
            selected={pageActive === page.path}
          >
            <FontAwesomeIcon icon={page.menuIcon} size="lg" />
            <span css={{ marginTop: 4 }}>{page.menuLabel}</span>
          </NavItem>
        ))}
      </NavMobileWrapperInner>
    </NavMobileWrapper>
  );
};

export default NavMobile;
