import { Fab, SvgIcon } from "@mui/material";
import { ReactComponent as GoogleLogo } from "./../../assets/google.svg";
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
  borderRadius: 40,
});

export const GoogleButton = (props) => {
  const StyledBtn = styled(Button)({
    backgroundColor: palette.grey,
    "&:hover": {
      backgroundColor: "#ccc",
    },
    fontWeight: "bold",
    color: "black",
    width: "100%",
    borderRadius: 40,
    padding: 10,
  });

  return (
    <StyledBtn onClick={props.onClick} disabled={props.disabled}>
      <SvgIcon sx={{ mr: 2 }}>
        <GoogleLogo />
      </SvgIcon>
      Continuar con Google
    </StyledBtn>
  );
};

export const LoginButton = styled(Button)({
  backgroundColor: palette.primary,
  "&:hover": {
    backgroundColor: palette.secondary,
  },
  fontWeight: "bold",
  width: "100%",
  borderRadius: 40,
  padding: 10,
});

export const FloatActionButton = styled(Fab)({
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
  backgroundColor: palette.primary,
  "&:hover": {
    backgroundColor: palette.secondary,
  },
});

export const CancelButton = styled(Button)({
  color: "black",
  backgroundColor: palette.lightGray,
  "&:hover": {
    backgroundColor: palette.darkGray,
  },
  borderRadius: 40,
});