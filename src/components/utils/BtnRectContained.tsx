import { styled } from "@mui/material/styles";

export type BtnProps = {
  action?: "confirm" | "dismiss" | "cancel" | "instantbook";
  disabled?: boolean;
};

export const BtnRectBase = styled("button")(({ theme }) => ({
  display: "flex",
  flexFlow: "nowrap",
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "flex-start",
  padding: `${theme.spacing(2)} ${theme.spacing(8)}`,
  fontWeight: 700,
  margin: theme.spacing(1),
  borderRadius: theme.spacing(3),
  transitionProperty: "background-color, border-color",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "100ms",
  cursor: "pointer",
}));

const BtnRectContained = styled(BtnRectBase)<BtnProps>(
  ({ theme }) => ({
    color: "white",
    backgroundColor: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    ":hover": {
      backgroundColor: theme.palette.primary.dark,
      border: `2px solid ${theme.palette.primary.dark}`,
    },
  }),
  ({ theme, action }) =>
    action === "confirm" && {
      backgroundColor: theme.palette.success.main,
      border: `2px solid ${theme.palette.success.main}`,
      ":hover": {
        backgroundColor: theme.palette.success.dark,
        border: `2px solid ${theme.palette.success.dark}`,
      },
    },
  ({ theme, action }) =>
    action === "cancel" && {
      backgroundColor: theme.palette.error.main,
      border: `2px solid ${theme.palette.error.main}`,
      ":hover": {
        backgroundColor: theme.palette.error.dark,
        border: `2px solid ${theme.palette.error.dark}`,
      },
    },
  ({ disabled }) =>
    disabled && {
      cursor: "not-allowed",
      backgroundColor: "silver",
      border: "2px solid silver",
      ":hover": {
        backgroundColor: "silver",
        border: "2px solid silver",
      },
    }
);

export default BtnRectContained;
