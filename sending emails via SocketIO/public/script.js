const notify = document.querySelector("#notification")
const message = document.querySelector("#message")
const button = document.querySelector("button")
const header = document.querySelector("#header")

const socket = io("http://localhost:8080")

function printMessage(e) {
    e.preventDefault()
    socket.emit("message", message.value)   
}
socket.on("response", data => {
    notify.textContent = data  
    header.style.backgroundColor = "#3F4E4F"
    header.style.height = "20vh"
})

button.addEventListener("click", printMessage)