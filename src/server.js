const express = require("express")
const {Server} = require("socket.io")

const app = express()

const PORT = process.env.PORT || 8080 //variable de entorno

//Inicializamos el serv

//servidor de express
const server = app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))

//Servidor de websocket y lo conectamos con el servidor express
const io = new Server(server)

app.use(express.static(__dirname+"/public"))

const historicoMensajes = []

io.on("connection",(socket)=>{
    console.log("Nuevo usuario conectado",socket.id)
    socket.broadcast.emit("newUser")
    socket.emit("historico",historicoMensajes)
    socket.on("message",data=>{
        console.log(data)
        historicoMensajes.push(data)
        io.sockets.emit("historico",historicoMensajes)
    })
})