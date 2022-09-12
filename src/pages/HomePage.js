import { Autocomplete, Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { currencyExchange } from "../apis/exchangeRateApi";
import { useUserContext } from "../contexts/UserContext";

const HomePage = (props) => {
  const navigate = useNavigate();
  const userContext = useUserContext();

  const [disableFields, setDisableFields] = useState(false);
  const [disableGetRates, setDisableGetRates] = useState(true);

  const handleConvurt = async () => {
    console.log(props.states.baseValue, props.states.exchangeValue);
    //do not allow convurt button if any of these conditions
    if (
      props.states.baseValue === props.states.exchangeValue ||
      !props.states.baseValue ||
      !props.states.exchangeValue
    ) {
      return props.setExchangeRate(1);
    }
    //call api and set api data
    const exchangeApiData = await currencyExchange(
      props.states.baseValue,
      props.states.exchangeValue
    );
    const getDate = Date();
    props.setExchangeRate(Number(exchangeApiData).toFixed(5));
    props.setDate(getDate);
    setDisableGetRates(false);
    setDisableFields(true);
  };

  const handleGetRates = () => {
    if (!userContext.email) {
      return navigate("/login");
    }
    return navigate("/wallet");
  };

  return (
    <Box
      ml={"auto"}
      mr={"auto"}
      width={"95%"}
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      gap={3}
      mt={2}
    >
      <Box alignSelf={"center"} fontWeight={"900"} fontSize={32}>
        EZConvurt
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Autocomplete
          disabled={disableFields}
          size="small"
          sx={{ width: "45%" }}
          onChange={(event, newValue) => {
            props.setBaseValue(newValue.value);
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
              label="Base Currency"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
        <Autocomplete
          disabled={disableFields}
          size="small"
          sx={{ width: 1 / 2 }}
          onChange={(event, newValue) => {
            props.setExchangeValue(newValue.value);
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
              label="Exchange Currency"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      </Box>
      <Box alignSelf={"center"}>
        <Button variant="contained" color="success" onClick={handleConvurt}>
          CONVURT
        </Button>
      </Box>
      {props.states.exchangeRate && (
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          gap={1.5}
          mt={2}
        >
          <Box alignSelf={"center"} fontWeight={"900"}>
            1 {props.states.baseValue}
          </Box>
          <Box alignSelf={"center"} fontWeight={"500"}>
            EQUALS
          </Box>
          <Box alignSelf={"center"} fontWeight={"900"}>
            {props.states.exchangeRate} {props.states.exchangeValue}
          </Box>
          <Box alignSelf={"center"} fontWeight={"500"}>
            AS AT
          </Box>
          <Box alignSelf={"center"} fontWeight={"900"} textAlign={"center"}>
            {props.states.date}
          </Box>
          <Box alignSelf={"center"} mt={2}>
            <Button
              variant="contained"
              color="error"
              disabled={disableGetRates}
              onClick={handleGetRates}
            >
              GET RATES
            </Button>
          </Box>
          <Box alignSelf={"center"} mt={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setDisableGetRates(true);
                setDisableFields(false);
                props.setExchangeRate(null);
              }}
            >
              Convurt Another
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export const countries = [
  { code: "AU", label: "Australian Dollar", value: "AUD" },
  { code: "CH", label: "Swiss Franc", value: "CHF" },
  { code: "CN", label: "Chinese Yuan", value: "CNY" },
  { code: "GB", label: "Pound Sterling", value: "GBP" },
  { code: "HK", label: "Hong Kong Dollar", value: "HKD" },
  { code: "ID", label: "Indonesian Rupiah", value: "IDR" },
  { code: "JP", label: "Japanese Yen", value: "JPY" },
  { code: "KR", label: "South Korean Won", value: "KRW" },
  { code: "LY", label: "Libyan Dinar", value: "LYD" },
  { code: "MA", label: "Moroccan Dirham", value: "MAD" },
  { code: "MM", label: "Myanmar Kyat", value: "MMK" },
  { code: "MV", label: "Maldivian Rufiyaa", value: "MVR" },
  { code: "MX", label: "Mexican Peso", value: "MXN" },
  { code: "MY", label: "Malaysian Ringgit", value: "MYR" },
  { code: "NO", label: "Norwegian Krone", value: "NOK" },
  { code: "NP", label: "Nepalese Rupee", value: "NPR" },
  { code: "NZ", label: "New Zealand Dollar", value: "NZD" },
  { code: "PE", label: "Sol", value: "PEN" },
  { code: "PH", label: "Philippine Peso", value: "PHP" },
  { code: "PK", label: "Pakistani Rupee", value: "PKR" },
  { code: "PL", label: "Poland Złoty", value: "PLN" },
  { code: "QA", label: "Qatari Rial", value: "QAR" },
  { code: "RO", label: "Romanian Leu", value: "RON" },
  { code: "RS", label: "Serbian Dinar", value: "RSD" },
  { code: "RU", label: "Russian Ruble", value: "RUB" },
  { code: "SA", label: "Saudi Riyal", value: "SAR" },
  { code: "SE", label: "Swedish Krona", value: "SEK" },
  { code: "SG", label: "Singapore Dollar", value: "SGD" },
  { code: "TH", label: "Thai Baht", value: "THB" },
  { code: "TR", label: "Turkish Lira", value: "TRY" },
  { code: "TW", label: "New Taiwan Dollar", value: "TWD" },
  { code: "UA", label: "Ukrainian Hryvnia", value: "UAH" },
  { code: "US", label: "United States Dollar", value: "USD" },
  { code: "VN", label: "Vietnamese Dong", value: "VND" },
  { code: "YE", label: "Yemeni Rial", value: "YER" },
  { code: "ZA", label: "South African Rand", value: "ZAR" },
];

export default HomePage;
