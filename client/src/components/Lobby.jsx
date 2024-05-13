import React, {useCallback, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "./SocketProvider";

const LobbyScreen = ()=>{
    const [email, setEmail] = useState('')
    const [room, setRoom] = useState('')

    const socket = useSocket()
    const navigate  = useNavigate()
    // console.log(socket);
    const handleSubmitForm = useCallback(
        (e)=> {
        e.preventDefault();
        socket.emit("room:join", {email,room})
    },[email,room, socket])


    const handleRoomJoin = useCallback((data)=>{
        const {email, room} = data
        console.log(email, room);
        navigate(`/room/${room}`)
    },[])

    useEffect(()=>{
        socket.on('room:join', handleRoomJoin)
        return ()=>{
            socket.off('room:join', handleRoomJoin)
        }
    },[])
    
    return(
        <div>
            <h1>Lobby</h1>
            <form onSubmit={handleSubmitForm} >
                <label htmlFor="email">Email ID</label>
                <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}  />
                <br />
                <label htmlFor="room">Room Number</label>
                <input type="text" id="room" value={room} onChange={(e)=>setRoom(e.target.value)} />
                <br />
                <button>Join</button>
            </form>
        </div>
    )
}

export default LobbyScreen;