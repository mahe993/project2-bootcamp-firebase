import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { InputAdornment, TextField, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //handleSubmit validates first. If no errors, onSubmit runs
    //Firebase sign-in Authentication to happen here
    //Sign-in fails to redirect to firebase registration, immediate signout after registration to force manual sign in.
    //Pass the data upstream ONLY after sign in
    console.log(data);
  };

  useEffect(() => {
    console.log(showPassword);
  }, []);

  return (
    <>
      <StyledTextField
        error
        type="email"
        label="E-Mail"
        helperText="Incorrect entry."
        variant="standard"
        placeholder="xxx@xxxmail.com"
        focused
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <AccountCircle fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      <StyledTextField
        error
        type={showPassword ? "text" : "password"}
        label="Password"
        helperText="Incorrect entry."
        variant="standard"
        placeholder="QWEqwe123!@#"
        focused
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityIcon fontSize="small" />
                ) : (
                  <VisibilityOffIcon fontSize="small" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default LoginForm;

export const StyledTextField = styled(TextField)`
  & ::placeholder {
    font-style: italic;
    font-size: 12px;
  }
`;
