import { useEffect, useState } from "react";
import "./AllTransactions.css";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CircularProgress } from "@mui/material";

const AllTransactions = () => {
  const [allTransactions, setAllTransactions] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getallTransactions = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          "https://vasu-gambhir-stripe-payment-backend.vercel.app/get-all-transactions",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (res.status !== 201) {
          alert("Error : somwthing went wrong");
        } else {
          setAllTransactions(res.data);
        }
      } catch (error: any) {
        console.log(error);
      }
      setIsLoading(false);
    };
    getallTransactions();
  }, []);
  console.log(allTransactions);

  return (
    <div className="all-transacations-container">
      <div className="all-transactions-container-inner">
        <div className="headline">
          <h1>All Transactions</h1>
        </div>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <div className="all-transactions-table">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1050 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Address</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allTransactions.map((row: any) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {row?.billing_details?.name}
                      </TableCell>
                      <TableCell align="center">
                        {row?.billing_details?.email}
                      </TableCell>
                      <TableCell align="center">
                        {row?.billing_details?.address
                          ? row?.billing_details?.address?.line1 +
                            ", " +
                            row?.billing_details?.address?.line2 +
                            ", " +
                            row?.billing_details?.address?.city +
                            ", " +
                            row?.billing_details?.address?.state +
                            ", " +
                            row?.billing_details?.address?.country +
                            ", " +
                            row?.billing_details?.address?.postal_code
                          : ""}
                      </TableCell>
                      <TableCell align="center">{row?.amount}</TableCell>
                      <TableCell align="center">
                        {row?.paid ? "Paid" : "Refunded"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTransactions;
