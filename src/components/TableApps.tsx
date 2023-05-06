import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function TableApps({ apps }: any) {
  return (
    <div
      style={{ paddingLeft: "50px", paddingRight: "50px", marginTop: "20px" }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell align='left'>
                <b>Datum der Installation</b>
              </TableCell>
              <TableCell align='left'>
                <b>Kategorie</b>
              </TableCell>
              <TableCell align='right'>
                <b>Preis</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apps.map((app: any, index: number) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {app.title}
                </TableCell>
                <TableCell align='left'>{app.firstInstallationTime}</TableCell>
                <TableCell align='left'>
                  {app.category
                    .toLowerCase()
                    .split("_")
                    .map(
                      (word: string) =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join(" ")}
                </TableCell>
                <TableCell align='right'>{app.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
