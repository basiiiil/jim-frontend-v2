import type { PageProps } from "gatsby";
import React from "react";
import { styled } from "@mui/material/styles";
import "../../styles.css";
import { Container } from "@mui/material";
import NavMobile from "./NavMobile";
import PageTitle from "./PageTitle";

const PageWrapper = styled("main")({
  display: "flex",
  width: "100vw",
  height: "100vh",
  minHeight: "100vh",
  // border: "4px dotted red",
});

const NavWrapper = styled("nav")(({ theme }) => ({
  display: "flex",
  flexFlow: "column nowrap",
  left: 0,
  width: 0,
  [theme.breakpoints.up("sm")]: {
    width: "20rem",
  },
  backgroundColor: theme.palette.primary.main,
}));

const MainWrapper = styled("div")({
  display: "flex",
  flexFlow: "column nowrap",
  width: "100%",
  height: "100%",
  // border: "4px dotted green",
  alignItems: "center",
});

const ContentContainer = styled(Container)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  // border: "2px solid magenta",
}));

// const ContentWrapper = styled("div")({
//   display: "flex",
//   flexFlow: "column nowrap",
//   width: "50%",
//   height: "100%",
//   border: "4px dotted red",
//   padding: "1rem",
// });

export const TopLayout = ({ children }: PageProps) => {
  return (
    <PageWrapper>
      <NavWrapper />
      <MainWrapper>
        <ContentContainer>
          <PageTitle />
          {children}
        </ContentContainer>
        <NavMobile />
      </MainWrapper>
    </PageWrapper>
  );
};
