import {useState, useEffect, useRef} from 'react';
import {ListGroup} from 'react-bootstrap';

import { authFetch } from "../../../util/authProvider";

import "./RoomList.scss";

export function RoomList(props) {

    const [list, setlist] = useState([])
    const [selected, setselected] = useState("")

    const intervalRef = useRef();

    useEffect(async() => {
        const res = await (await authFetch("/api/room")).json();
        setlist(res.res)
        intervalRef.current = setInterval(async()=>{
            const res = await (await authFetch("/api/room")).json();
            setlist(res.res)
        },1000)
        return ()=>{
            clearInterval(intervalRef.current);
        }
    }, [])

    const click = (id)=>{
        setselected(id);
        props.setChat(id)
    }

    const listJSX = list.map((item, i)=>{
        if(selected == item._id){
            return (
                <ListGroup.Item  key={i} onClick={click.bind(this, item._id)} active action>
                    {item.name}
                </ListGroup.Item>
                )
        }
        return (
            <ListGroup.Item  key={i} onClick={click.bind(this, item._id)} action>
                {item.name}
            </ListGroup.Item>
            )
    })

    return (
        <div className="RoomList">
        <ListGroup defaultActiveKey="#link1">
            {listJSX}
        </ListGroup>
        </div>
    )
}
