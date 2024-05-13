const { Server } = require("socket.io");

const io = new Server(8000,{
    cors: true
})


const emailToSocket = new Map()
const socketToEmail = new Map()

io.on('connection',(socket)=>{
    console.log(`Socket Connected`, socket.id);
    socket.on('room:join', data =>{
        const {email, room} = data
        emailToSocket.set(email, socket.id)
        socketToEmail.set(socket.id, email)
        io.to(room).emit('user:joined', {email, id:socket.id})
        socket.join(room)
        io.to(socket.id).emit("room:join",data)
        console.log(data);
    })

})