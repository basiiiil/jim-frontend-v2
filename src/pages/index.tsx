import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { BtnRectContained, BtnRectOutlined } from "../components/utils/basics";
import { PageTitleContext } from "../utils/pagetitle-provider";

// markup
const IndexPage = () => {
  const { pageTitle, setPageTitle } = React.useContext(PageTitleContext);
  useEffect(() => {
    setPageTitle("TestTitle");
  }, []);

  const IndexWrapper = styled.div({
    display: "flex",
    alignItems: "start",
  });

  return (
    <IndexWrapper>
      <div>sdjvn</div>
    </IndexWrapper>
  );
};

export default IndexPage;
