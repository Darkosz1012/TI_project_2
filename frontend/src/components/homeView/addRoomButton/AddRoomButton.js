import { useState, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

import { authFetch } from "../../../util/authProvider";

import { useAlert } from 'react-alert'

export function AddRoomButton(params) {
    const alert = useAlert();
    const [show, setShow] = useState(false);
    const form = useRef(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const save = async () => {
        var formData = new FormData(form.current);
        try {
            const res = await (await authFetch("/api/room", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData))
            })).json();
            if(res.success){
                alert.success("Dodano pokój.")
            }else{
                alert.error("Problem z dodaniem pokoju: "+JSON.stringify(res.message))
            }
        } catch (err) {
            alert.error("Problem z dodaniem pokoju.")
        }
        handleClose();

    }

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                Dodaj pokój
        </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj pokój</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form ref={form}>
                        <Form.Group>
                            <Form.Label>Nazwa:</Form.Label>
                            <Form.Control type="text" name="name" required />
                        </Form.Group>

                        {/* <Form.Group>
                            <Form.Label>Hasło (nie szyfrowane):</Form.Label>
                            <Form.Control type="password" name="password" />
                        </Form.Group> */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Zamknij
            </Button>
                    <Button variant="primary" onClick={save}>
                        Zapisz
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
