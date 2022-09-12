/* eslint-disable default-case */
import { Avatar, Badge, Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import { useUserContext } from "../contexts/UserContext";
import EditIcon from "@mui/icons-material/Edit";
import styled from "@emotion/styled";
import { ref as databaseRef, update } from "firebase/database";
import { database, storage } from "../firebase";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";

const AccountPage = (props) => {
  const userContext = useUserContext();
  const navigate = useNavigate();

  const [usernameValue, setUsernameValue] = useState(
    userContext.username ? userContext.username : userContext.email
  );

  useEffect(() => {
    return () =>
      setUsernameValue(
        userContext.username ? userContext.username : userContext.email
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //to prevent user manual typing in address bar
  if (!userContext.email) {
    return navigate("/");
  }

  //change profile pic
  const handleProfilePic = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    // const metadata = {
    //   contentType: "image/jpeg",
    // };

    const uploadTask = uploadBytesResumable(
      storageRef(storage, `users/${userContext.userId}/profilePic.jpg`),
      e.target.value
      // metadata
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        console.log("success");
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            props.setAvatarURL(downloadURL);
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

              // ...

              case "storage/unknown":
                // Unknown error occurred, inspect the server response
                break;
            }
          });
      }
    );
  };

  //change username
  const handleUsername = () => {
    console.log(usernameValue);
    update(databaseRef(database, "users/" + userContext.userId), {
      username: usernameValue,
    });
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"100%"}
      height={"80vh"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box
        width={"95%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={3}
      >
        <Box>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={handleProfilePic}
                />
                <EditIcon sx={{ width: 40, height: 40 }} />
              </label>
            }
          >
            <Avatar
              alt="error"
              src={props.avatarURL}
              sx={{ width: 130, height: 130 }}
            />
          </Badge>
        </Box>
        <Box fontWeight={800}>
          {userContext.username ? userContext.username : userContext.email}
        </Box>
        <Box display={"flex"}>
          <Box>
            <TextField
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.target.value)}
              variant="standard"
              label="Username"
              focused
            />
          </Box>
          <Box>
            <Button
              variant="outlined"
              onClick={handleUsername}
              sx={{ height: 45 }}
            >
              Update
            </Button>
          </Box>
        </Box>
        <Box alignSelf={"center"} className={"about-section"}>
          Welcome to EZConvurt!
        </Box>
      </Box>
      <Box alignSelf={"center"} mt={4}>
        <HomeButton />
      </Box>
    </Box>
  );
};

export default AccountPage;

const Input = styled("input")({
  display: "none",
});
