import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import { palette } from "./styles";

export const NavButton = styled(Button)({
  color: "white",
  "&:hover": {
    backgroundColor: palette.secondary,
  },
});

export const PrimaryButton = styled(Button)({
  backgroundColor: palette.primary,
  "&:hover": {
    backgroundColor: palette.secondary,
  },
});
