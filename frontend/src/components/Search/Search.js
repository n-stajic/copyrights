import { useState } from 'react';

import XMLParser from 'react-xml-parser';

import { Button, Grid, Typography, TextField } from '@mui/material';
import A1FormTable from '../A1Form/A1FormTable';

async function search(searchTerm) {
    var token = 'Bearer ' + localStorage.getItem("token");
    var body = "<search>" + searchTerm + "</search>"

    return fetch(process.env.REACT_APP_BACKEND_URL + '/a1_forms/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/xml',
            'Authorization': token,
        },
        body: body,
    })
        .then((response) => {
            if (!response.ok) throw new Error(response.status);
            else return response.text();
        })
        .then(text => {
            return new XMLParser().parseFromString(text);
        })
        .catch(err => {
            console.log("Error: ", err)
        });
}

export default function Search() {
    const [searchTerm, setSearchTerm] = useState();
    const [a1Forms, setA1Forms] = useState([])

    const handleSearch = async e => {
        e.preventDefault();
        const data = await search(
            searchTerm,
        );
        console.log("data: ", data)
        if (data !== undefined) {
            setA1Forms(data.getElementsByTagName("a1-form"))
        }
    }

    return (
        <div>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '100vh' }}
            >
                <Typography variant="h3" gutterBottom >
                    Pretraga
                </Typography>
                <TextField
                    required
                    id="search"
                    label="search"
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <br />
                <Button variant="contained" onClick={handleSearch}>Search</Button>
                <br />
                <A1FormTable rows={a1Forms} />
            </Grid>
        </div>
    )
}