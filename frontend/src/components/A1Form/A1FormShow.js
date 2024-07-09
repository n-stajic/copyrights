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

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
        >
            <Typography variant="h3" gutterBottom sx={{ pt: 2 }} >
                A1 Form
            </Typography>
            <TextField
                sx={{ m: 1 }}
                disabled
                id="outlined-required"
                label="submitter"
                value={submitter}
            />
            <TextField
                sx={{ m: 1 }}
                disabled
                id="outlined-required"
                label="pseudonym"
                value={pseudonym}
            />
            <TextField
                sx={{ m: 1 }}
                disabled
                id="outlined-required"
                label="proxy"
                value={proxy}
            />
            <TextField
                sx={{ m: 1 }}
                disabled
                id="outlined-required"
                label="artTitle"
                value={artTitle}
            />
            <TextField
                sx={{ m: 1 }}
                disabled
                id="outlined-required"
                label="artData"
                value={artData}
            />
            <TextField
                sx={{ m: 1 }}
                disabled
                id="outlined-required"
                label="artType"
                value={artType}
            />
            <TextField
                sx={{ m: 1 }}
                disabled
                id="outlined-required"
                label="artFormat"
                value={artFormat}
            />
            <TextField
                sx={{ m: 1 }}
                disabled
                id="outlined-required"
                label="authorData"
                value={authorData}
            />
            <TextField
                sx={{ m: 1 }}
                disabled
                id="outlined-required"
                label="createdDuringEmployment"
                value={createdDuringEmployment}
            />
            <TextField
                sx={{ m: 1 }}
                disabled
                id="outlined-required"
                label="useIntentions"
                value={useIntentions}
            />
            <TextField
                sx={{ m: 1 }}
                disabled
                id="outlined-required"
                label="form status"
                value={formStatus}
            />
            <TextField
                sx={{ m: 1 }}
                disabled
                id="outlined-required"
                label="comment"
                value={comment}
            />
            <br />
            {userType === "clerk" && comment === 'in_review' && <Box sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Typography variant="h3" gutterBottom sx={{ ml: 2, pt: 2 }} >
                    Process form
                </Typography>
                <TextField
                    multiline
                    sx={{ mt: 2, mr: 2 }}
                    id="outlined-required"
                    label="comment"
                    onChange={e => setAuditorComment(e.target.value)}
                />
                <br />
                <Box>
                    <Button variant="contained" sx={{ mr: 2, mb: 2 }} onClick={approve}>Approve</Button>
                    <Button variant="contained" sx={{ mb: 2 }} onClick={reject}>Reject</Button>
                </Box>
            </Box>}
        </Grid>
    )
}