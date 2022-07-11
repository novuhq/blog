const express = require("express")
const app = express()
const http = require("http").Server(app)
const PORT = process.env.PORT || 8080
const path = require("path")
const socketIO = require("socket.io")(http)

app.use(express.static("public"))

socketIO.on("connection", socket => {
    console.log(`⚡: ${socket.id} user just connected`)
    socket.on("message", data => {
        socket.broadcast.emit("response", data)
    })
})

app.get("/", (req, res)=> {
    res.sendFile(path.join(__dirname, "/index.html"))
})


http.listen(PORT, ()=> {
    console.log(`App listening at ${PORT}`)
} )