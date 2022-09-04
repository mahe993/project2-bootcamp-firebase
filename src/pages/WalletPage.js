import {
  Box,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  useThemeProps,
} from "@mui/material";
import { onValue, ref } from "firebase/database";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExchangeCurrency from "../components/ExchangeCurrency";
import TabPanel from "../components/TabPanel";
import { useUserContext } from "../contexts/UserContext";
import { database } from "../firebase";
import _ from "lodash";
import HomeButton from "../components/HomeButton";

const WalletPage = (props) => {
  const userContext = useUserContext();
  const navigate = useNavigate();

  const [value, setValue] = useState(0);
  const [wallet, setWallet] = useState({});
  const [transactions, setTransactions] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!userContext.email) {
    return navigate("/");
  }

  const walletRef = ref(database, "users/" + userContext.userId + "/wallet");

  onValue(walletRef, (snapshot) => {
    if (!_.isEqual(wallet, snapshot.val())) {
      setWallet(snapshot.val());
    }
  });

  const transactionsRef = ref(database, "transactions/" + userContext.userId);

  onValue(transactionsRef, (snapshot) => {
    if (!_.isEqual(transactions, snapshot.val())) {
      setTransactions(snapshot.val());
    }
    console.log(transactions);
  });

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"100%"}
      justifyContent={"space-between"}
      height={"80vh"}
    >
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Wallet Balance" />
            <Tab label="Transaction History" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box mt={2} width={"50%"} display={"flex"} mr={"auto"} ml={"auto"}>
            <TableContainer component={Paper}>
              <Table sx={{ maxWidth: "100%" }} size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <strong>Currency</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Amount</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(wallet).map((curr) => (
                    <TableRow
                      key={curr}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {curr}
                      </TableCell>
                      <TableCell align="center">{wallet[curr]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box mt={2} width={"80%"} display={"flex"} mr={"auto"} ml={"auto"}>
            <TableContainer component={Paper}>
              <Table sx={{ maxWidth: "100%" }} size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <strong>Transaction Type</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Amount</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>From</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>To</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Date</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions &&
                    Object.entries(transactions).map((x) => (
                      <TableRow
                        key={x[0]}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center" component="th" scope="row">
                          {x[1].type}
                        </TableCell>
                        <TableCell align="center">{x[1].amount}</TableCell>
                        <TableCell align="center">{x[1].from}</TableCell>
                        <TableCell align="center">{x[1].to}</TableCell>
                        <TableCell align="center">{x[0]}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </TabPanel>
        {props.states.exchangeRate && (
          <ExchangeCurrency
            states={props.states}
            wallet={wallet}
            setExchangeRate={props.setExchangeRate}
          />
        )}
      </Box>
      <Box alignSelf={"center"} mt={4}>
        <HomeButton />
      </Box>
    </Box>
  );
};

export default WalletPage;
