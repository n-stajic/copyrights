import React, { useState } from 'react';
import XMLParser from 'react-xml-parser';
import { TextField, Grid, Box, Typography, Button } from '@mui/material';

async function createA1Form(a1Form, setError, setHelperText) {
    var token = 'Bearer ' + localStorage.getItem("token");
    var body = "<a1_form>" +
        "<submitter>" + a1Form.submitter + "</submitter>" +
        "<pseudonym>" + a1Form.pseudonym + "</pseudonym>" +
        "<proxy>" + a1Form.proxy + "</proxy>" +
        "<art_title>" + a1Form.artTitle + "</art_title>" +
        "<art_data>" + a1Form.artData + "</art_data>" +
        "<art_type>" + a1Form.artType + "</art_type>" +
        "<art_format>" + a1Form.artFormat + "</art_format>" +
        "<author_data>" + a1Form.authorData + "</author_data>" +
        "<created_during_employment>" + a1Form.createdDuringEmployment + "</created_during_employment>" +
        "<use_intentions>" + a1Form.useIntentions + "</use_intentions>" +
        "</a1_form>"

    return fetch(process.env.REACT_APP_BACKEND_URL + '/a1_forms', {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/xml'
        },
        body: body
    })
        .then((response) => {
            if (!response.ok) throw new Error(response.status);
            else return response.text();
        })
        .then(data => {
            setError(false)
            return new XMLParser().parseFromString(data);
        })
        .catch(err => {
            setError(true)
            setHelperText("Required fields are not filled")
        });
}


export default function A1CreateForm() {
    const [submitter, setSubmitter] = useState("");
    const [pseudonym, setPseudonym] = useState("");
    const [proxy, setProxy] = useState("");
    const [artTitle, setArtTitle] = useState("");
    const [artData, setArtData] = useState("");
    const [artType, setArtType] = useState("");
    const [artFormat, setArtFormat] = useState("");
    const [authorData, setAuthorData] = useState("");
    const [createdDuringEmployment, setCreatedDuringEmployment] = useState("");
    const [useIntentions, setUseIntentions] = useState("");

    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const data = await createA1Form({
            submitter , pseudonym, proxy, artTitle, artData, artType, artFormat, authorData, createdDuringEmployment, useIntentions
        }, setError, setHelperText
        );
        console.log("data: ",data)
        if(data !== undefined) {
            window.location.href = '/a1-forms';
        }
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
        >
            <Typography variant="h3" gutterBottom sx={{ pt: 2 }} >
                Create A1 Form
            </Typography>
            <Box component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}>
                <TextField
                    required
                    error={error && submitter.length === 0}
                    id="outlined-required"
                    label="submitter"
                    variant="standard"
                    onChange={e => setSubmitter(e.target.value)}
                />
                <br />
                <TextField
                    id="outlined-required"
                    label="pseudonym"
                    variant="standard"
                    onChange={e => setPseudonym(e.target.value)}
                />
                <br />
                <TextField
                    id="outlined-required"
                    label="proxy"
                    variant="standard"
                    onChange={e => setProxy(e.target.value)}
                />
                <br />
                <TextField
                    required
                    error={error && artTitle.length === 0}
                    id="outlined-required"
                    label="art title"
                    variant="standard"
                    onChange={e => setArtTitle(e.target.value)}
                />
                <br />
                <TextField
                    id="outlined-textarea"
                    label="art data"
                    variant="standard"
                    multiline
                    onChange={e => setArtData(e.target.value)}
                />
                <br />
                <TextField
                    required
                    error={error && artType.length === 0}
                    id="outlined-required"
                    label="art type"
                    variant="standard"
                    onChange={e => setArtType(e.target.value)}
                />
                <br />
                <TextField
                    required
                    error={error && artFormat.length === 0}
                    id="outlined-required"
                    label="art format"
                    variant="standard"
                    onChange={e => setArtFormat(e.target.value)}
                />
                <br />
                <TextField
                    id="outlined-required"
                    label="author data"
                    variant="standard"
                    onChange={e => setAuthorData(e.target.value)}
                />
                <br />
                <TextField
                    id="outlined-textarea"
                    label="created during employment"
                    multiline
                    variant="standard"
                    onChange={e => setCreatedDuringEmployment(e.target.value)}
                />
                <br />
                <TextField
                    id="outlined-required"
                    label="use intentions"
                    variant="standard"
                    onChange={e => setUseIntentions(e.target.value)}
                />
                <br />
                <Typography variant="p" gutterBottom sx={{ pt: 2 }} color="error">
                    {helperText}
                </Typography>
                <br />
                <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>Create</Button>
            </Box>
        </Grid>
    )
}