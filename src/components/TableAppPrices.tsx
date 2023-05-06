import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function AppPricesTable({ prices }: any) {
  return (
    <div
      style={{ marginTop: "20px" }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Price</b>
              </TableCell>
              <TableCell align='right'>
                <b>Count</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prices.map((price: any, index: number) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {price.price}
                </TableCell>
                <TableCell align='right'>{price.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{paddingTop: '5px', fontSize: '11px'}}>
        * If there are paid apps, search for the price in the app list with strg + f and verify the app
      </div>
    </div>
  );
}
