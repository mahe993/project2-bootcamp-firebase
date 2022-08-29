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
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TabPanel from "../components/TabPanel";
import { useUserContext } from "../contexts/UserContext";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const WalletPage = () => {
  const userContext = useUserContext();
  const navigate = useNavigate();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!userContext.email) {
    return navigate("/");
  }

  return (
    <>
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
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.calories}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box mt={2} width={"50%"} display={"flex"} mr={"auto"} ml={"auto"}>
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
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.calories}</TableCell>
                      <TableCell align="center">{row.calories}</TableCell>
                      <TableCell align="center">{row.calories}</TableCell>
                      <TableCell align="center">{row.calories}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </TabPanel>
      </Box>
    </>
  );
};

export default WalletPage;
