import { styled } from "@mui/material/styles";
import * as React from "react";
import { PageTitleContext } from "../utils/PageTitleProvider";

const PageTitleWrapper = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  color: theme.palette.jimgray.main,
}));

const PageTitle = function () {
  const { pageTitle } = React.useContext(PageTitleContext);

  return (
    <PageTitleWrapper>
      <h1>{pageTitle}</h1>
    </PageTitleWrapper>
  );
};

export default PageTitle;
