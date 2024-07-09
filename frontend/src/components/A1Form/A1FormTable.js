import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function A1FormTable(a1Forms) {
    return (
        <TableContainer component={Paper}>
            <Grid container justifyContent="center">
                <Typography variant="h4" color="inherit" component="div">
                    A1 Forms
                </Typography>
            </Grid>
            <Table sx={{ minWidth: 600 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Podnosilac</TableCell>
                        <TableCell align="right">Pseudonim</TableCell>
                        <TableCell align="right">Punomoćnik</TableCell>
                        <TableCell align="right">Naslov</TableCell>
                        <TableCell align="right">Vrsta dela</TableCell>
                        <TableCell align="right">Forma zapisa</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        a1Forms.rows.map(a1Form => (
                            <TableRow
                                key={a1Form.getElementsByTagName("_id")[0].value}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {a1Form.getElementsByTagName("submitter")[0].value}
                                </TableCell>
                                <TableCell align="right">{a1Form.getElementsByTagName("pseudonym")[0].value}</TableCell>
                                <TableCell align="right">{a1Form.getElementsByTagName("proxy")[0].value}</TableCell>
                                <TableCell align="right">{a1Form.getElementsByTagName("art-title")[0].value}</TableCell>
                                <TableCell align="right">{a1Form.getElementsByTagName("art-type")[0].value}</TableCell>
                                <TableCell align="right">{a1Form.getElementsByTagName("art-format")[0].value}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" onClick={() => window.location.href = '/a1-forms/' + a1Form.getElementsByTagName("_id")[0].value}>
                                        Show
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
