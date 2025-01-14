/* eslint-disable default-case */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { Alert, Box, InputAdornment, TextField } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { auth, database, storage } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import RegisterDialog from "./RegisterDialog";
import Snackbar from "@mui/material/Snackbar";
import { ref, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref as storageRef } from "firebase/storage";

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

  const navigate = useNavigate();

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
        //Add user in firebase realtime db
        update(ref(database, "users/" + userCredential.user.uid), {
          email: userCredential.user.email,
          wallet: { SGD: 0 },
        });
        //get profile pic
        getDownloadURL(
          storageRef(storage, `users/${userCredential.user.uid}/profilePic.jpg`)
        )
          .then((url) => {
            console.log("download url :", url);
            props.setAvatarURL(url);
          })
          .catch((error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/object-not-found":
                // File doesn't exist
                break;
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;
              case "storage/canceled":
                // User canceled the upload
                break;
              case "storage/unknown":
                // Unknown error occurred, inspect the server response
                break;
            }
          });
        //Navigate to home page
        navigate("/");
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
        <Box
          display={"flex"}
          maxWidth={"100vw"}
          width={"100vw"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={5}
        >
          <Box>
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
          </Box>
          <Box>
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
          </Box>
          <Box>
            <StyledTextField type="submit" value="Login/Signup" />
          </Box>
        </Box>
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
