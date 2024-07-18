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
            setHelperText("Obavezna polja nisu popunjena")
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
            submitter, pseudonym, proxy, artTitle, artData, artType, artFormat, authorData, createdDuringEmployment, useIntentions
        }, setError, setHelperText
        );
        console.log("data: ", data)
        if (data !== undefined) {
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
                Podnesi A-1 obrazac
            </Typography>
            <Box component="form"
                sx={{
                    '& .MuiTextField-root': { p: 1 },
                    '& .MuiTypography-root': { p: 1 },
                }}>
                <Typography variant="p" >
                    Podnosilac - ime, prezime, adresa i državljansto autra ili drugog nosioca autorskog prava ako je podnosilac fizičko lice,
                    odnosno poslovno ime i sedište nosioca autorskog prava ako je podnosilac pravno lice*:
                </Typography>
                <TextField
                    fullWidth
                    required
                    multiline
                    rows={4}
                    error={error && submitter.length === 0}
                    id="submitter"
                    onChange={e => setSubmitter(e.target.value)}
                />
                <Typography variant="p" >
                    Pseudonim ili znak autora, (ako ga ima):
                </Typography>
                <TextField
                    fullWidth
                    id="pseudonym"
                    onChange={e => setPseudonym(e.target.value)}
                />
                <Typography variant="p" >
                    Ime, przime i adresa punomoćnika, ako se prijava podnosi preko punomoćnika:
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    id="proxy"
                    onChange={e => setProxy(e.target.value)}
                />
                <Typography variant="p" >
                    Naslov autorskog dela, odnosno alternativni naslov, ako ga ima, po kome autorsko delo može da se identifikuje*:
                </Typography>
                <TextField
                    fullWidth
                    required
                    error={error && artTitle.length === 0}
                    id="art-title"
                    onChange={e => setArtTitle(e.target.value)}
                />
                <Typography variant="p" >
                    Podaci o naslovu autorksog dela na kome se zasniva delo prerade, ako je u pitanju autorsko delo prerade, kao i podatak o autoru izvornog dela:
                </Typography>
                <TextField
                    multiline
                    fullWidth
                    rows={4}
                    id="art-data"
                    onChange={e => setArtData(e.target.value)}
                />
                <Typography variant="p" >
                    Podaci o vrsti autorskog dela (književno delo, muzičko delo, likovno delo, računarski program i dr.)*:
                </Typography>
                <TextField
                    fullWidth
                    required
                    error={error && artType.length === 0}
                    id="art-type"
                    onChange={e => setArtType(e.target.value)}
                />
                <Typography variant="p" >
                    Podaci o formi zapisa autorskog dela (štampani tekst, optički disk i slično)*:
                </Typography>
                <TextField
                    fullWidth
                    required
                    error={error && artFormat.length === 0}
                    id="art-format"
                    onChange={e => setArtFormat(e.target.value)}
                />
                <Typography variant="p" >
                    Podaci o autoru ako podnosilac prijave iz tačke 1. ovog zahteva nije autor i to:
                    prezime, ime, adresa i državljanstvo autora (grupe autora ili koautora), ako su u pitanju jedan ili više
                    autora koji nisu živi, imena autora i godina smrti autora a ako je u pitanju autorsko delo anonimnog autora
                    navod da je autorsko delo delo anonimnog autora:
                </Typography>
                <TextField
                    fullWidth
                    id="author-data"
                    onChange={e => setAuthorData(e.target.value)}
                />
                <Typography variant="p" >
                    Podatak da li je autorsko delo stvoreno u radnom odnosu:
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    id="created-during-employment"
                    onChange={e => setCreatedDuringEmployment(e.target.value)}
                />
                <Typography variant="p" >
                    Način korišćenja autorskog dela ili nameravani način korišćenja autorskog dela:
                </Typography>
                <TextField
                    fullWidth
                    id="use-intentions"
                    onChange={e => setUseIntentions(e.target.value)}
                />
                <br />
                <Typography variant="p" gutterBottom sx={{ pt: 2 }} color="error">
                    {helperText}
                </Typography>
                <br />
                <Button variant="contained" sx={{ mt: 2, mb: 2 }} onClick={handleSubmit}>Podnesi zahtev</Button>
            </Box>
        </Grid>
    )
}