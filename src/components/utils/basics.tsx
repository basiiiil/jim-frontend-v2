import styled from "@emotion/styled";
import * as React from "react";

type BtnRectProps = {
  action?: "confirm" | "dismiss" | "cancel";
  disabled?: boolean;
};

const btnRectBase = styled.button({
  padding: "0.5rem 2rem",
  fontWeight: 700,
  fontSize: "16px",
  margin: "2rem",
  borderRadius: "12px",
  transitionProperty: "background-color, border-color",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "100ms",
  cursor: "pointer",
});

export const BtnRectContained = styled(btnRectBase)<BtnRectProps>(
  (props) => ({
    color: "white",
    backgroundColor: props.theme.colors.primary.base,
    border: `2px solid ${props.theme.colors.primary.base}`,
    ":hover": {
      backgroundColor: props.theme.colors.primary.dark,
      border: `2px solid ${props.theme.colors.primary.dark}`,
    },
  }),
  (props) =>
    props.disabled && {
      cursor: "not-allowed",
      backgroundColor: "silver",
      border: "2px solid silver",
      ":hover": {
        backgroundColor: "silver",
        border: "2px solid silver",
      },
    },
  (props) =>
    props.action === "confirm" && {
      backgroundColor: props.theme.colors.confirmGreen.base,
      border: `2px solid ${props.theme.colors.confirmGreen.base}`,
      ":hover": {
        backgroundColor: props.theme.colors.confirmGreen.dark,
        border: `2px solid ${props.theme.colors.confirmGreen.dark}`,
      },
    },
  (props) =>
    props.action === "cancel" && {
      backgroundColor: props.theme.colors.cancelRed.base,
      border: `2px solid ${props.theme.colors.cancelRed.base}`,
      ":hover": {
        backgroundColor: props.theme.colors.cancelRed.dark,
        border: `2px solid ${props.theme.colors.cancelRed.dark}`,
      },
    }
);

export const BtnRectOutlined = styled(btnRectBase)<BtnRectProps>(
  (props) => ({
    color: props.theme.colors.jimgray.base,
    backgroundColor: "white",
    border: `2px solid ${props.theme.colors.jimgray.base}`,
    ":hover": {
      backgroundColor: "whitesmoke",
    },
  }),
  (props) =>
    props.disabled && {
      cursor: "not-allowed",
      color: "silver",
      border: "2px solid silver",
      ":hover": {
        backgroundColor: "white",
      },
    },
  (props) =>
    props.action === "confirm" && {
      color: props.theme.colors.confirmGreen.base,
      border: `2px solid ${props.theme.colors.confirmGreen.base}`,
      ":hover": {
        color: props.theme.colors.confirmGreen.dark,
        border: `2px solid ${props.theme.colors.confirmGreen.dark}`,
      },
    },
  (props) =>
    props.action === "cancel" && {
      color: props.theme.colors.cancelRed.base,
      border: `2px solid ${props.theme.colors.cancelRed.base}`,
      ":hover": {
        color: props.theme.colors.cancelRed.dark,
        border: `2px solid ${props.theme.colors.cancelRed.dark}`,
      },
    }
);
