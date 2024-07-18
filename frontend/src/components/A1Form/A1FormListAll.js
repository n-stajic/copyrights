import { useEffect, useState } from 'react';

import XMLParser from 'react-xml-parser';

import A1FormTable from './A1FormTable';
import { Button, Grid } from '@mui/material';


export default function A1FormListAll() {
    const [data, setData] = useState(null)
    var a1Forms = []

    const userType = localStorage.getItem("user_type");

    useEffect(() => {
        var token = 'Bearer ' + localStorage.getItem("token");

        fetch(process.env.REACT_APP_BACKEND_URL + '/a1_forms', {
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
                setData(xml)
            })
            .catch(err => {
                console.log("Error: ", err)
            });
    }, [])

    if (data) {
        a1Forms = data.getElementsByTagName("a1-form")
    }

    return (
        <div>
            {userType === "citizen" &&
                    <Grid sx={{ m: 2, pr: 3 }} container justifyContent="flex-end">
                        <Button variant="contained" onClick={() => window.location.href = '/a1-forms/create'}>Napravi A-1 obrazac</Button>
                    </Grid>
            }
            {a1Forms.length > 0 && <A1FormTable rows={a1Forms} />}
        </div>
    )
}