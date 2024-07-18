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

import { saveAs } from 'file-saver'


async function getDownloadPDFFile(a1FormId) {
    var token = 'Bearer ' + localStorage.getItem("token");

    return fetch(process.env.REACT_APP_BACKEND_URL + '/a1_forms/pdf_download/' + a1FormId, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })
        .then(response => response.blob());
}

async function getDownloadXHTMLFile(a1FormId) {
    var token = 'Bearer ' + localStorage.getItem("token");

    return fetch(process.env.REACT_APP_BACKEND_URL + '/a1_forms/xhtml_download/' + a1FormId, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })
        .then(response => response.blob());
}

export default function A1FormTable(a1Forms) {
    const handleDownloadPDF = async (a1FormId) => {
        getDownloadPDFFile(a1FormId)
            .then(blob => saveAs(blob, "a1_form.pdf"))
    }
    const handleDownloadXHTML = async (a1FormId) => {
        getDownloadXHTMLFile(a1FormId)
            .then(blob => saveAs(blob, "a1_form.xhtml"))
    }

    return (
        <TableContainer component={Paper}>
            <Grid container justifyContent="center">
                <Typography variant="h4" color="inherit" component="div">
                    A-1 obrasci
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
                                    <Button variant="contained" onClick={() => window.location.href = '/a1-forms/' + a1Form.getElementsByTagName("_id")[0].value} sx={{ mr: 2 }}>
                                        Prikaži
                                    </Button>
                                    <Button variant="contained" value={a1Form.getElementsByTagName("_id")[0].value} onClick={e => handleDownloadPDF(e.target.value)} sx={{ mr: 2 }}>
                                        Preuzmi PDF
                                    </Button>
                                    <br />
                                    <Button variant="contained" value={a1Form.getElementsByTagName("_id")[0].value} onClick={e => handleDownloadXHTML(e.target.value)} sx={{ mr: 2, mt: 2 }}>
                                        Preuzmi XHTML
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
