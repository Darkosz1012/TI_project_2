import React, { useState } from 'react';
import { login, UserId } from "../../../util/authProvider";
import { Form , Button } from 'react-bootstrap';
import { decodeToken } from "react-jwt";
import { useAlert } from 'react-alert'

export default function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const alert = useAlert();
    const handleSubmit = async e => {
        e.preventDefault();
        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(r => r.json())
            .then(({ token }) => {
                if(token){
                    UserId.setId(decodeToken(token.accessToken).id)
                    alert.success('Zarejestowano.')
                }else{
                    alert.error('Taki użytkownik już istnieje.')
                }   
                login(token)
            });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group >
                <Form.Label>Nazwa użytkownika: </Form.Label>
                <Form.Control type="text" placeholder="Nazwa użytkownika" onChange={e => setUserName(e.target.value)} />
                
            </Form.Group>

            <Form.Group >
                <Form.Label>Hasło: </Form.Label>
                <Form.Control type="password" placeholder="Hasło" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Zarejestruj się
            </Button>
        </Form>
    )
}

