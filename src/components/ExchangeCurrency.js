import { Box, Button, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import { StyledTextField } from "./LoginForm";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { increment, ref, update } from "firebase/database";
import { database } from "../firebase";
import { useUserContext } from "../contexts/UserContext";

const ExchangeCurrency = (props) => {
  const [exchangeAmount, setExchangeAmount] = useState(1);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const userContext = useUserContext();

  const handleExchange = () => {
    if (isNaN(exchangeAmount) || exchangeAmount <= 0 || !exchangeAmount) {
      setErrorMessage("Enter a valid number");
      return setError(true);
    }

    //add condition that exchange amount cannot be larger than what is in wallet
    if (
      !props.wallet[props.states.baseValue] ||
      props.wallet[props.states.baseValue] === 0 ||
      props.wallet[props.states.baseValue] === undefined ||
      props.wallet[props.states.baseValue] === null ||
      props.wallet[props.states.baseValue] - exchangeAmount < 0
    ) {
      setErrorMessage("Not enough funds in wallet");
      return setError(true);
    }
    //all conditions cleared
    setError(false);

    //reduce Number(exchangeAmount) from stated currency
    update(ref(database, "users/" + userContext.userId + "/wallet"), {
      [props.states.baseValue]: increment(-Number(exchangeAmount)),
    });

    //increase same amount to destinated currency
    update(ref(database, "users/" + userContext.userId + "/wallet"), {
      [props.states.exchangeValue]: increment(
        Number((exchangeAmount * props.states.exchangeRate).toFixed(5))
      ),
    });

    //record transaction under transactions in realtime db
    update(
      ref(
        database,
        "transactions/" + userContext.userId + `/${Date().slice(0, 33)}`
      ),
      {
        type: "Exchange",
        amount: `${exchangeAmount}(${props.states.exchangeRate})`,
        from: props.states.baseValue,
        to: props.states.exchangeValue,
      }
    );

    //set props.exchangerate to null
    props.setExchangeRate(null);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      mt={4}
      mb={4}
      gap={2}
    >
      <Box fontWeight={"900"} fontSize={32}>
        <em>E X C H A N G E</em>
      </Box>
      <Box alignSelf={"center"}>
        <StyledTextField
          value={exchangeAmount}
          onChange={(event) => {
            setExchangeAmount(event.target.value);
          }}
          sx={{ width: "100%" }}
          size="small"
          error={error}
          type="number"
          label="Amount"
          helperText={error && errorMessage}
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
      <Box>
        {exchangeAmount} <strong>{props.states.baseValue}</strong>{" "}
        <strong>➡</strong>{" "}
        {(exchangeAmount * props.states.exchangeRate).toFixed(5)}{" "}
        <strong>{props.states.exchangeValue}</strong>
      </Box>
      <Box alignSelf={"center"}>
        <Button variant="contained" color="success" onClick={handleExchange}>
          E X C H A N G E
        </Button>
      </Box>
    </Box>
  );
};

export default ExchangeCurrency;
