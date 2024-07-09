import React, { useState } from 'react';
import XMLParser from 'react-xml-parser';
import { TextField, Grid, Box, Typography, Button } from '@mui/material';

async function registerUser(user, setError, setHelperText) {
    var body = "<user>" +
        "<email>" + user.email + "</email>" +
        "<username>" + user.username + "</username>" +
        "<first_name>" + user.firstName + "</first_name>" +
        "<last_name>" + user.lastName + "</last_name>" +
        "<password>" + user.password + "</password>" +
        "</user>"

    return fetch(process.env.REACT_APP_BACKEND_URL + '/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/xml'
        },
        credentials: 'include',
        body: body
    })
        .then((response) => {
            if (!response.ok) throw new Error(response.status);
            else return response.text();
        })
        .then(data => {
            return new XMLParser().parseFromString(data);
        })
        .catch(err => {
            setError(true)
            setHelperText("Invalid credentials")
        });
}

export default function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [error, setError] = useState();
    const [helperText, setHelperText] = useState();

    if (localStorage.getItem("token")) {
        window.location.href = '/';
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const data = await registerUser(
            {
                email,
                password,
                username,
                firstName,
                lastName,
            },
            setError,
            setHelperText,
        );
        if (data !== undefined) {
            localStorage.setItem("token", data.getElementsByTagName("token")[0].value);
            localStorage.setItem("user_type", data.getElementsByTagName("user")[0].getElementsByTagName("user-type")[0].value);
            window.location.href = '/';
        }
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh' }}
        >
            <Typography variant="h3" gutterBottom >
                Register
            </Typography>
            <Box component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}>
                <TextField
                    required
                    error={error && email.length === 0}
                    id="outlined-required"
                    label="email"
                    variant="standard"
                    onChange={e => setEmail(e.target.value)}
                />
                <br />
                <TextField
                    required
                    error={error && username.length === 0}
                    id="outlined-required"
                    label="username"
                    variant="standard"
                    onChange={e => setUsername(e.target.value)}
                />
                <br />
                <TextField
                    required
                    error={error && firstName.length === 0}
                    id="outlined-required"
                    label="first name"
                    variant="standard"
                    onChange={e => setFirstName(e.target.value)}
                />
                <br />
                <TextField
                    required
                    error={error && lastName.length === 0}
                    id="outlined-required"
                    label="last name"
                    variant="standard"
                    onChange={e => setLastName(e.target.value)}
                />
                <br />
                <TextField
                    required
                    error={error && lastName.length < 8}
                    id="standard-password-input"
                    label="password"
                    type="password"
                    variant="standard"
                    onChange={e => setPassword(e.target.value)}
                />
                <br />
                <Typography variant="p" gutterBottom sx={{ pt: 2 }} color="error">
                    {helperText}
                </Typography>
                <br />
                <Button variant="contained" onClick={handleSubmit}>Register</Button>
            </Box>
        </Grid>
    );
}
