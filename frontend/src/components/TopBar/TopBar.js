import * as React from 'react';

import XMLParser from 'react-xml-parser';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';


async function logoutUser() {
    var token = 'Bearer ' + localStorage.getItem("token");

    return fetch(process.env.REACT_APP_BACKEND_URL + '/logout', {
        method: 'DELETE',
        headers: {
            'Authorization': token,
        },
    })
        .then((response) => {
            if (!response.ok) throw new Error(response.status);
            else return response.text();
        })
        .then(data => {
            return new XMLParser().parseFromString(data);
        })
        .catch(err => {
            console.log("error: ", err)
        });
}

export default function TopBar() {
    const handleSubmit = async e => {
        e.preventDefault();
        const data = await logoutUser();
        if (data !== undefined) {
            localStorage.removeItem("token");
            localStorage.removeItem("user_type");
            window.location.href = '/';
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Link href="/" color="inherit">
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <HomeIcon />
                        </IconButton>
                    </Link>
                    <Link href="/a1-forms" color="inherit">
                        <Typography variant="h6" color="inherit" component="div" sx={{ mr: 2 }}>
                            A-1 obrasci
                        </Typography>
                    </Link>
                    <Link href="/search" color="inherit" sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" color="inherit" component="div">
                            Pretraga
                        </Typography>
                    </Link>
                    <Link href="#" onClick={handleSubmit} color="inherit" justify="flex-end">
                        <Typography variant="h6" color="inherit" component="div">
                            Izloguj se
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
