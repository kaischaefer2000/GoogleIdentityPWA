import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ locations }: any) {
  return (
    <div style={{ marginTop: "20px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Location</b>
              </TableCell>
              <TableCell align='left'>
                <b>City?</b>
              </TableCell>
              <TableCell align='right'>
                <b>Count</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map((location: any) => (
              <TableRow
                key={location.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {location.name}
                </TableCell>
                <TableCell align='left'>
                  {location.lastValueComparable}
                </TableCell>
                <TableCell align='right'>{location.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
