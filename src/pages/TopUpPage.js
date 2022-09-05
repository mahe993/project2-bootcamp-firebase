import {
  Alert,
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  Snackbar,
  TextField,
} from "@mui/material";
import { increment, ref, update } from "firebase/database";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledTextField } from "../components/LoginForm";
import { useUserContext } from "../contexts/UserContext";
import { database } from "../firebase";
import { countries } from "./HomePage";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import HomeButton from "../components/HomeButton";

const TopUpPage = () => {
  const [currency, setCurrency] = useState();
  const [topUpAmount, setTopUpAmount] = useState();
  const [error, setError] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const userContext = useUserContext();
  const navigate = useNavigate();

  //to prevent user manual typing in address bar
  if (!userContext.email) {
    return navigate("/");
  }

  const handleTopUp = () => {
    if (isNaN(topUpAmount) || topUpAmount <= 0 || !topUpAmount) {
      return setError(true);
    }
    console.log("test:", currency, topUpAmount);
    setError(false);
    //add amount to currency in wallet
    update(ref(database, "users/" + userContext.userId + "/wallet"), {
      [currency]: increment(Number(topUpAmount)),
    });
    //record topup transaction
    update(
      ref(
        database,
        "transactions/" + userContext.userId + `/${Date().slice(0, 33)}`
      ),
      {
        type: "Top Up",
        amount: topUpAmount,
        from: "magic bank",
        to: currency,
      }
    );
    //success message
    setOpenSnackBar(true);
    setSnackBarMessage("You have successfully topped up funds!");
    setCurrency(null);
    setTopUpAmount(null);
  };

  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      height={"80vh"}
    >
      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        gap={4}
        mt={2}
      >
        <Box alignSelf={"center"} fontWeight={"900"} fontSize={32}>
          <em>TOP UP WALLET</em>
        </Box>
        <Box
          width={"100%"}
          mr={"auto"}
          ml={"auto"}
          display={"flex"}
          justifyContent={"space-around"}
        >
          <Autocomplete
            size="small"
            sx={{ width: "45%" }}
            onChange={(event, newValue) => {
              setCurrency(newValue.value);
            }}
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option.value}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 1, flexShrink: 0 } }}
                {...props}
              >
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.label} ({option.value})
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Currency"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          <StyledTextField
            onChange={(event) => {
              setTopUpAmount(event.target.value);
              console.log(topUpAmount);
            }}
            onBlur={() =>
              isNaN(topUpAmount) ? setError(true) : setError(false)
            }
            sx={{ width: "45%" }}
            size="small"
            error={error}
            type="number"
            label="Amount"
            helperText={error && "Enter a valid number"}
            variant="outlined"
            placeholder="0"
            focused
            autoComplete="off"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <LocalAtmIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box alignSelf={"center"}>
          <Button variant="contained" color="success" onClick={handleTopUp}>
            TOP UP
          </Button>
        </Box>
        <Snackbar
          open={openSnackBar}
          autoHideDuration={6000}
          onClose={() => {
            setOpenSnackBar(false);
            setSnackBarMessage("");
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => {
              setOpenSnackBar(false);
              setSnackBarMessage("");
            }}
            severity="success"
            sx={{ width: "100%" }}
            variant="filled"
          >
            {snackBarMessage}
          </Alert>
        </Snackbar>
      </Box>
      <Box alignSelf={"center"}>
        <HomeButton />
      </Box>
    </Box>
  );
};
export default TopUpPage;
