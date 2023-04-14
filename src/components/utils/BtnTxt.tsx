import { styled } from "@mui/material/styles";
import { BtnProps } from "./BtnRectContained";

const BtnTxt = styled("button")<BtnProps>(
  ({ theme }) => ({
    textTransform: "uppercase",
    border: "none",
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
    fontWeight: 700,
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    cursor: "pointer",
    ":hover": {
      backgroundColor: "whitesmoke",
    },
  }),
  ({ theme, action }) =>
    action === "confirm" && {
      color: theme.palette.success.main,
    },
  ({ theme, action }) =>
    action === "cancel" && {
      color: theme.palette.error.main,
    },
  ({ disabled }) =>
    disabled && {
      cursor: "not-allowed",
      color: "silver",
      ":hover": {
        backgroundColor: "transparent",
      },
    }
);

export default BtnTxt;
