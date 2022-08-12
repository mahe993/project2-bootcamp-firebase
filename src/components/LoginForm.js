import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { InputAdornment, TextField, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const { ref: emailRef, ...emailRegProps } = register("email", {
    required: "This field is required",
    pattern: {
      value: /^[a-z0-9._%+-]+@[a-z0-9.-]/,
      message: "Please enter a valid email",
    },
  });
  const { ref: passwordRef, ...passwordRegProps } = register("password", {
    required: "This field is required",
  });

  const onSubmit = (data) => {
    //handleSubmit validates first. If no errors, onSubmit runs
    //Firebase sign-in Authentication to happen here
    //Sign-in fails to redirect to firebase registration, immediate signout after registration to force manual sign in.
    //Pass the data upstream and change page (props.toggleLoginStatus()) ONLY after sign in
    console.log(data);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    console.log(showPassword);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledTextField
        error={errors.email ? true : false}
        type="text"
        label="E-Mail"
        helperText={errors.email && errors.email.message}
        variant="standard"
        placeholder="xxx@xxxmail.com"
        focused
        autoComplete="off"
        inputRef={emailRef}
        {...emailRegProps}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <AccountCircle fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      <StyledTextField
        error={errors.password ? true : false}
        type={showPassword ? "text" : "password"}
        label="Password"
        helperText={errors.password && errors.password.message}
        variant="standard"
        placeholder="QWEqwe123!@#"
        focused
        autoComplete="off"
        name="password"
        inputRef={passwordRef}
        {...passwordRegProps}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              {showPassword ? (
                <VisibilityIcon onClick={toggleShowPassword} fontSize="small" />
              ) : (
                <VisibilityOffIcon
                  onClick={toggleShowPassword}
                  fontSize="small"
                />
              )}
            </InputAdornment>
          ),
        }}
      />
      <StyledTextField type="submit" value="Login/Signup" />
    </form>
  );
};

export default LoginForm;

export const StyledTextField = styled(TextField)`
  & ::placeholder {
    font-style: italic;
    font-size: 12px;
  }
`;
