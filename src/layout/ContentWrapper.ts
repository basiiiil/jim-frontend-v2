import { styled } from "@mui/material/styles";

const ContentWrapper = styled("div")(({theme}) => ({
    overflowY: "auto",
    flexGrow:1,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    // border: "2px solid green"
}));

export default ContentWrapper;