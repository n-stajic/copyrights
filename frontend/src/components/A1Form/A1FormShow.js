import { useEffect, useState } from 'react';

import XMLParser from 'react-xml-parser';

import { TextField, Grid, Typography, Button, Box } from '@mui/material';

async function proccessForm(a1FormId, status, comment) {
    var token = 'Bearer ' + localStorage.getItem("token");
    var body = "<a1_form>" +
        "<id>" + a1FormId + "</id>" +
        "<status>" + status + "</status>" +
        "<comment>" + comment + "</comment>" +
        "</a1_form>"

    return fetch(process.env.REACT_APP_BACKEND_URL + '/a1_forms/process_form', {
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
            // setError(false)
            return new XMLParser().parseFromString(data);
        })
        .catch(err => {
            // setError(true)
            // setHelperText("Required fields are not filled")
        });
}


export default function A1FormShow() {
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
    const [formStatus, setFormStatus] = useState("");
    const [comment, setComment] = useState("");

    const [auditorComment, setAuditorComment] = useState("");

    const a1FormId = window.location.pathname.split("/").pop();

    const userType = localStorage.getItem("user_type");

    useEffect(() => {
        var token = 'Bearer ' + localStorage.getItem("token");

        fetch(process.env.REACT_APP_BACKEND_URL + '/a1_forms/' + a1FormId, {
            method: 'GET',
            headers: {
                'Authorization': token,
            }
        })
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.text();
            })
            .then(text => {
                var xml = new XMLParser().parseFromString(text);
                var a1Form = xml.getElementsByTagName("a1-form")[0];

                console.log("xml: ", xml)
                console.log("a1Form: ", a1Form)

                setSubmitter(a1Form.getElementsByTagName("submitter")[0].value);
                setPseudonym(a1Form.getElementsByTagName("pseudonym")[0].value);
                setProxy(a1Form.getElementsByTagName("proxy")[0].value);
                setArtTitle(a1Form.getElementsByTagName("art-title")[0].value);
                setArtData(a1Form.getElementsByTagName("art-data")[0].value);
                setArtType(a1Form.getElementsByTagName("art-type")[0].value);
                setArtFormat(a1Form.getElementsByTagName("art-format")[0].value);
                setAuthorData(a1Form.getElementsByTagName("author-data")[0].value);
                setCreatedDuringEmployment(a1Form.getElementsByTagName("created-during-employment")[0].value);
                setUseIntentions(a1Form.getElementsByTagName("use-intentions")[0].value);
                setFormStatus(a1Form.getElementsByTagName("status")[0].value);
                setComment(a1Form.getElementsByTagName("comment")[0].value);
            })
            .catch(err => {
                console.log("Error: ", err);
            });
    }, [a1FormId]);


    const handleClick = async (status) => {
        const data = await proccessForm(a1FormId, status, auditorComment);
        console.log("data: ", data)
        if (data !== undefined) {
            window.location.href = '/a1-forms';
        }
    }

    const approve = async e => {
        e.preventDefault();
        handleClick("approved")
    }

    const reject = async e => {
        e.preventDefault();
        handleClick("rejected")
    }

    const translateStatus = (status) => {
        switch (status) {
            case "in_review":
                return "Na čekanju"
            case "approved":
                return "Prihvaćen"
            case "rejected":
                return "Odbijen"
            default:
                return ""
        }
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
        >
            <Typography variant="h3" gutterBottom sx={{ pt: 2, pl: 2 }} >
                Obrazac A-1
            </Typography>

            <Typography variant="p" sx={{ pl: 2 }} >
                Podnosilac - ime, prezime, adresa i državljansto autra ili drugog nosioca autorskog prava ako je podnosilac fizičko lice,
                odnosno poslovno ime i sedište nosioca autorskog prava ako je podnosilac pravno lice:
            </Typography>
            <Typography variant="p" sx={{ pl: 4, pb: 2 }}>
                {submitter}
            </Typography>

            <Typography variant="p" sx={{ pl: 2 }} >
                Pseudonim ili znak autora, (ako ga ima):
            </Typography>
            <Typography variant="p" sx={{ pl: 4, pb: 2 }}>
                {pseudonym}
            </Typography>

            <Typography variant="p" sx={{ pl: 2 }} >
                Ime, przime i adresa punomoćnika, ako se prijava podnosi preko punomoćnika:
            </Typography>
            <Typography variant="p" sx={{ pl: 4, pb: 2 }}>
                {proxy}
            </Typography>

            <Typography variant="p" sx={{ pl: 2 }} >
                Naslov autorskog dela, odnosno alternativni naslov, ako ga ima, po kome autorsko delo može da se identifikujes:
            </Typography>
            <Typography variant="p" sx={{ pl: 4, pb: 2 }}>
                {artTitle}
            </Typography>

            <Typography variant="p" sx={{ pl: 2 }} >
                Podaci o naslovu autorksog dela na kome se zasniva delo prerade, ako je u pitanju autorsko delo prerade, kao i podatak o autoru izvornog dela:
            </Typography>
            <Typography variant="p" sx={{ pl: 4, pb: 2 }}>
                {artData}
            </Typography>

            <Typography variant="p" sx={{ pl: 2 }} >
                Podaci o vrsti autorskog dela (književno delo, muzičko delo, likovno delo, računarski program i dr.):
            </Typography>
            <Typography variant="p" sx={{ pl: 4, pb: 2 }}>
                {artType}
            </Typography>

            <Typography variant="p" sx={{ pl: 2 }} >
                Podaci o formi zapisa autorskog dela (štampani tekst, optički disk i slično):
            </Typography>
            <Typography variant="p" sx={{ pl: 4, pb: 2 }}>
                {artFormat}
            </Typography>

            <Typography variant="p" sx={{ pl: 2 }} >
                Podaci o autoru ako podnosilac prijave iz tačke 1. ovog zahteva nije autor i to:
                prezime, ime, adresa i državljanstvo autora (grupe autora ili koautora), ako su u pitanju jedan ili više
                autora koji nisu živi, imena autora i godina smrti autora a ako je u pitanju autorsko delo anonimnog autora
                navod da je autorsko delo delo anonimnog autora:
            </Typography>
            <Typography variant="p" sx={{ pl: 4, pb: 2 }}>
                {authorData}
            </Typography>

            <Typography variant="p" sx={{ pl: 2 }} >
                Podatak da li je autorsko delo stvoreno u radnom odnosu:
            </Typography>
            <Typography variant="p" sx={{ pl: 4, pb: 2 }}>
                {createdDuringEmployment}
            </Typography>

            <Typography variant="p" sx={{ pl: 2 }} >
                Način korišćenja autorskog dela ili nameravani način korišćenja autorskog dela:
            </Typography>
            <Typography variant="p" sx={{ pl: 4, pb: 2 }}>
                {useIntentions}
            </Typography>


            <Typography variant="p" sx={{ pl: 2 }} >
                Status prijave:
            </Typography>
            <Typography variant="p" sx={{ pl: 4, pb: 2 }}>
                {translateStatus(formStatus)}
            </Typography>

            {comment && <div>
                <Typography variant="p" sx={{ pl: 2 }} >
                    Obrazloženje:
                </Typography>
                <Typography variant="p" sx={{ pl: 4, pb: 2 }}>
                    {comment}
                </Typography>
            </div>}
            <br />
            {userType === 'clerk' && formStatus === 'in_review' && <Box sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Typography variant="h5" gutterBottom sx={{ pl: 2, pt: 2 }} >
                    Procesiraj obrazac
                </Typography>
                <TextField
                    multiline
                    fullWidth
                    rows={4}
                    sx={{ pt: 2, pl: 2, pr: 2 }}
                    id="auditor-comment"
                    onChange={e => setAuditorComment(e.target.value)}
                />
                <br />
                <Box>
                    <Button variant="contained" sx={{ mr: 2, mb: 2, ml: 2 }} onClick={approve}>Prihvati</Button>
                    <Button variant="contained" sx={{ mb: 2 }} onClick={reject}>Odbij</Button>
                </Box>
            </Box>}
        </Grid>
    )
}