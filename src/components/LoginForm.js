import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { Alert, InputAdornment, TextField } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { auth, writeUserData } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import RegisterDialog from "./RegisterDialog";
import Snackbar from "@mui/material/Snackbar";

const LoginForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    reset,
  } = useForm({ mode: "onBlur" });

  //register email input field
  const { ref: emailRef, ...emailRegProps } = register("email", {
    required: "This field is required",
    pattern: {
      value: /^[a-z0-9._%+-]+@[a-z0-9.-]/,
      message: "Please enter a valid email",
    },
  });

  //register password input field
  const { ref: passwordRef, ...passwordRegProps } = register("password", {
    required: "This field is required",
    minLength: { value: 6, message: "Password minimum of 6 characters" },
  });

  //onSubmit callback for react hook form handleSubmit method
  //handleSubmit validates form first. If no errors, onSubmit runs
  const onSubmit = (data) => {
    console.log(data);
    //Firebase sign-in Authentication
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        //Signed in
        console.log("logged in successfully:", userCredential);
        //Navigate to home page
        props.toggleLoginStatus();
      })
      .catch((error) => {
        console.log("Firebase sign in error:", error.code);
        if (error.code === "auth/user-not-found") {
          //open RegisterDialog
          setOpenRegisterDialog(true);
        } else if (error.code === "auth/wrong-password") {
          //create form error in password field
          setError("password", { type: "custom", message: "Wrong password!" });
        }
      });
  };

  const registerUser = () => {
    createUserWithEmailAndPassword(
      auth,
      getValues("email"),
      getValues("password")
    )
      .then((userCredential) => {
        // Signed in
        console.log("registration successful:", userCredential.user.uid);
        // Add user to realtime database
        writeUserData(userCredential.user.uid, getValues("email"), 0);
        //open Snackbar saying success and to relog
        setOpenSnackBar(true);
        //signout
        signOut(auth)
          .then(() => {
            console.log("signout successful");
            //close RegisterDialog
            setOpenRegisterDialog(false);
            //reset form fields
            reset();
          })
          .catch((error) => {
            // An error happened.
            console.log("signout error:", error);
          });
      })
      .catch((error) => {
        console.log("registration error:", error.code);
        if (error.code === "auth/invalid-email") {
          setError("email", {
            type: "custom",
            message: "Email invalid. Try another.",
          });
          setOpenRegisterDialog(false);
        }
      });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
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
                  <VisibilityIcon
                    onClick={toggleShowPassword}
                    fontSize="small"
                  />
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
      <RegisterDialog
        openRegisterDialog={openRegisterDialog}
        setOpenRegisterDialog={setOpenRegisterDialog}
        registerUser={registerUser}
      />
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackBar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackBar(false)}
          severity="success"
          sx={{ width: "100%" }}
          variant="filled"
        >
          Registration successful! Please Re-Login!
        </Alert>
      </Snackbar>
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
