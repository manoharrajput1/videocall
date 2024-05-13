import React, { useCallback, useEffect, useState } from "react"
import { useSocket } from "./SocketProvider"
import ReactPlayer from 'react-player'


const RoomPage = () => {
    const [remoteId, setRemoteId] = useState(null)
    const [myStream, setMyStream] = useState()
    const socket = useSocket()

    const handleUser = useCallback(({email,id})=>{
        console.log(email);
        setRemoteId(id)
    },[])

    const handleCallUser = useCallback( async()=>{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        }) 
        setMyStream(stream)
    },[])

    useEffect(()=> {
        socket.on('user:joined', handleUser)
        return() => socket.off('user:joined', handleUser)
    }, [socket, handleUser])
    return (
        <div>
            <h1> Room Page</h1>
            <div> {remoteId ? 'Connected' : 'No one in the room'} </div>
            {remoteId && <button onClick={handleCallUser} > Call </button> }
            {myStream && <ReactPlayer playing muted height='300px' width='400px' url={myStream}/>}
        </div>
    )
}

export default RoomPage