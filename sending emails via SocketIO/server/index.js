const socketIO = require("socket.io")(3000, {
    cors: {
        origin: "http://localhost:5500"
    }
})

socketIO.on("connection", socket => {
    console.log("Connected", socket.id)
    socket.on("message", data => {
        socket.broadcast.emit("response", data)
    })
})