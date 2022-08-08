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

  const IndexWrapper = styled.div`
    display: flex;
    flex-flow: column wrap;
    align-items: start;
  `;

  return (
    <IndexWrapper>
      <BtnRectContained>Jetzt Einsätze suchen</BtnRectContained>
      <BtnRectContained disabled>Jetzt Einsätze suchen</BtnRectContained>
      <BtnRectContained action="confirm">
        Jetzt Einsätze suchen
      </BtnRectContained>
      <BtnRectContained action="cancel">Jetzt Einsätze suchen</BtnRectContained>
      <BtnRectOutlined>Jetzt Einsätze buchen</BtnRectOutlined>
      <BtnRectOutlined disabled>Jetzt Einsätze buchen</BtnRectOutlined>
      <BtnRectOutlined action="confirm">Jetzt Einsätze buchen</BtnRectOutlined>
      <BtnRectOutlined action="cancel">Jetzt Einsätze buchen</BtnRectOutlined>
    </IndexWrapper>
  );
};

export default IndexPage;
