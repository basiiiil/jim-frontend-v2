import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/material/styles";

type IconWithMarginProps = {
  ml?: number;
  mr?: number;
  mt?: number;
  mb?: number;
};

const IconWithMargin = styled(FontAwesomeIcon)<IconWithMarginProps>(
  ({ theme, ml = 0, mr = 0, mt = 0, mb = 0 }) => ({
    marginLeft: theme.spacing(ml),
    marginRight: theme.spacing(mr),
    marginBottom: theme.spacing(mb),
    marginTop: theme.spacing(mt),
  })
);

export default IconWithMargin;
