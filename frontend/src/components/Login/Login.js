import React, { useState } from 'react';
import XMLParser from 'react-xml-parser';
import { TextField, Grid, Box, Typography, Button, Link } from '@mui/material';

async function loginUser(email, password, setError, setHelperText) {
    var body = "<user><email>" + email + "</email><password>" + password + "</password></user>"

    return fetch(process.env.REACT_APP_BACKEND_URL + '/login', {
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

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [helperText, setHelperText] = useState();

    if (localStorage.getItem("token")) {
        window.location.href = '/';
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const data = await loginUser(
            email,
            password,
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
                Login
            </Typography>
            <Box component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}>
                <TextField
                    required
                    error={error}
                    id="outlined-required"
                    label="email"
                    variant="standard"
                    onChange={e => setEmail(e.target.value)}
                    helperText={helperText}
                />
                <br />
                <TextField
                    required
                    error={error}
                    id="standard-password-input"
                    label="password"
                    type="password"
                    variant="standard"
                    onChange={e => setPassword(e.target.value)}
                />
                <br />
                <Button variant="contained" onClick={handleSubmit}>Login</Button>
                <br />
                <Link href="/register" justify="flex-end">
                    <Typography variant="p" color="inherit" component="div">
                        Register
                    </Typography>
                </Link>
            </Box>
        </Grid>
    );
}
