import {useState} from 'react';
import { Button, Navbar, Form, Nav } from 'react-bootstrap';
import {logout} from '../../util/authProvider'

import {RoomList} from './roomList/RoomList'
import {AddRoomButton} from './addRoomButton/AddRoomButton'
import {Chat} from './chat/Chat';

import "./HomeView.scss";

export default function HomeView() {

    const [RoomId, setRoomId] = useState("")

    const setChat = (id)=>{
        console.log(id);
        setRoomId(id)
    }

    return (
        <div className="HomeView">
            
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand >Chat</Navbar.Brand>
                <Nav className="mr-auto">
                </Nav>
                <Form inline>
                    <Button variant="danger" onClick={logout}>Wyloguj</Button>
                </Form>
            </Navbar>
            <div className="HomeView__content">
                <div className="HomeView__side-panel">
                    <AddRoomButton/>
                    <RoomList setChat={setChat}/>
                </div>
                <div className="HomeView__chat">
                    <Chat id={RoomId}/>
                </div>
            </div>
        </div>
    )
}
