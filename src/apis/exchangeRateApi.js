import axios from "axios";

export const currencyExchange = async (fromCurrency, toCurrency) => {
  try {
    const res = await axios({
      method: "GET",
      url: process.env.REACT_APP_CURRENCY_EXCHANGE_API_URL,
      params: {
        to_currency: toCurrency,
        function: "CURRENCY_EXCHANGE_RATE",
        from_currency: fromCurrency,
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_CURRENCY_EXCHANGE_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_CURRENCY_EXCHANGE_API_HOST,
      },
    });
    console.log(res.headers["x-ratelimit-requests-remaining"]);
    console.log(
      res.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
    );
    return res.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
  } catch (err) {
    console.log(err);
  }
};
