import { styled } from "@mui/material/styles";
import { BtnRectBase, BtnProps } from "./BtnRectContained";

const BtnRectOutlined = styled(BtnRectBase)<BtnProps>(
  ({ theme }) => ({
    color: theme.palette.jimgray.main,
    backgroundColor: "transparent",
    border: `2px solid ${theme.palette.jimgray.main}`,
    ":hover": {
      backgroundColor: "whitesmoke",
    },
  }),
  ({ theme, action }) =>
    action === "confirm" && {
      color: theme.palette.success.main,
      border: `2px solid ${theme.palette.success.main}`,
      ":hover": {
        color: theme.palette.success.dark,
        border: `2px solid ${theme.palette.success.dark}`,
      },
    },
  ({ theme, action }) =>
    action === "cancel" && {
      color: theme.palette.error.main,
      border: `2px solid ${theme.palette.error.main}`,
      ":hover": {
        color: theme.palette.error.dark,
        border: `2px solid ${theme.palette.error.dark}`,
      },
    },
  ({ theme, action }) =>
    action === "instantbook" && {
      color: "transparent",
      border: "2px solid #38bdf8",
      background: "linear-gradient(to bottom left, #4ade80, #3b82f6)",
      backgroundClip: "text",
      userSelect: "none",
      ":hover": {
        color: theme.palette.error.dark,
        border: `2px solid ${theme.palette.error.dark}`,
      },
    },
  ({ disabled }) =>
    disabled && {
      cursor: "not-allowed",
      color: "silver",
      border: "2px solid silver",
      ":hover": {
        backgroundColor: "transparent",
      },
    }
);

export default BtnRectOutlined;
