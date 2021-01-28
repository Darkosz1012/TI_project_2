import {useState, useEffect, useRef} from 'react';
import {ListGroup} from 'react-bootstrap';

import {UserId, authFetch } from "../../../util/authProvider";

import "./Chat.scss";

export function Chat(props) {

    // const [password, setPassword] = useState("")
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")

    const [store, setStore] = useState([])

    const intervalRef = useRef();

    const getMessages = async()=>{
        return await (await authFetch(`/api/room/${props.id}`,{
        })).json();
    }

    const sendMessage = async(content)=>{
        try{
            setInput("");
            const res = await (await authFetch(`/api/room/${props.id}`,{
                method:"POST",
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({
                    "message":{
                        "user":UserId.getId(),
                        "content":content
                    }
                })
            })).json();
            
        }catch(err){
            console.log(err);
            var key = props.id+UserId.getId();
            var arr = JSON.parse(localStorage.getItem(key));
            arr = arr == null ? [] : arr;
            arr.push(content);
            localStorage.setItem(key, JSON.stringify(arr))
            getFromStorage()
        }
    }

    const getFromStorage = () =>{
        var key = props.id+UserId.getId();
        var arr = JSON.parse(localStorage.getItem(key));
        arr = arr == null ? [] : arr;
        setStore(arr)
        return arr;
    }

    const deleteFromStorage = (i)=>{
        var key = props.id+UserId.getId();
        var arr = JSON.parse(localStorage.getItem(key));
        arr.splice(i,1)
        localStorage.setItem(key, JSON.stringify(arr))
        getFromStorage()
    }

    const sendFromStorage = (i)=>{
        var key = props.id+UserId.getId();
        var arr = JSON.parse(localStorage.getItem(key));
        var content = arr.splice(i,1);
        localStorage.setItem(key, JSON.stringify(arr));
        sendMessage(content[0]);
        getFromStorage()
    }


    useEffect(async() => {
        setMessages([])
        clearInterval(intervalRef.current);
        getFromStorage()
        if(props.id!=""){
            const res = await getMessages();
            setMessages(res.res.messages);
            intervalRef.current = setInterval(async()=>{
                const res = await getMessages();
                setMessages(res.res.messages);
            },1000)
        }
        return  ()=>{
            clearInterval(intervalRef.current);
        }
    }, [props.id])

    if(props.id == ""){
        return (
            <div className="Chat">
                
            </div>
        )
    }else{
        console.log(store)
        return (
            <div className="Chat">
                <div className="form-control Chat__content">
                    {store.map((item, i)=>(
                        <div className="Chat__message">
                            <div className="Chat__message-username">Nie wysłana wiadomość</div>
                            <pre className="Chat__message-content">{item}</pre>
                            <button type="button" className="btn btn-primary Chat__button" onClick={sendFromStorage.bind(this, i)}>Wyślij ponownie</button>
                            <button type="button" className="btn btn-danger Chat__button" onClick={deleteFromStorage.bind(this, i)}>Usuń</button>
                        </div>
                    ))}
                    {messages.slice(0).reverse().map((item)=>(
                        <div className={item.user._id == UserId.getId() ? "Chat__message Chat__message-my" : "Chat__message" }>
                            <div className="Chat__message-username">{item.user.username}</div>
                            <div className="Chat__message-date">{new Date(item.date).toLocaleString()}</div>
                            <pre className="Chat__message-content">{item.content}</pre>
                        </div>
                    ))}
                </div>
                <form className="Chat__form" >
                    <textarea className="form-control Chat__input" value={input} onChange={(e) => setInput(e.target.value)}/>
                    <button type="button" className="btn btn-primary Chat__button" onClick={sendMessage.bind(this,input)}>Wyślij</button>
                </form>
            </div>
        )
    }
}
