import {Socket} from "phoenix"

let socket = new Socket("/socket")

socket.connect()

let roomId            = Math.floor(Math.random() * 100)
let room              = socket.channel("room:" + roomId)
let nameInput         = document.getElementById("name-input")
let messageInput      = document.getElementById("message-input")
let messagesContainer = document.getElementById("messages")
let timerContainer    = document.getElementById("timer")

let renderMessage = (msg) => {
  return `<p> <b>${msg.username}: </b>${msg.body}</p>`
}

let getName = () => {
  var name = nameInput.value.toString()
  return(name === "" ? "guest" : name)
}

let now = () => { return (new Date()).getTime() }

let startTimer = () => {
  messageInput.disabled = true
  let startedAt = now()
  let timer = setInterval(() => {
  timerContainer.innerHTML = `0s ...`
  let elapsed = (now() - startedAt) / 1000
    timerContainer.innerHTML = `${elapsed}s ...`
  }, 100)
  return {timer, startedAt}
}

let stopTimer = ({timer, startedAt}) => {
  messageInput.disabled = false
  clearInterval(timer)
  let elapsed = (now() - startedAt) / 1000
  timerContainer.innerHTML = `${elapsed}s ✅`
}

messageInput.addEventListener("keypress", event => {
  if(event.keyCode !== 13){ return }

  event.preventDefault()
  let timer = startTimer()
  room.push("publish_message", {username: getName(), body: messageInput.value}, 120000)
      .receive("ok", resp =>  stopTimer(timer) )
      .receive("error", resp => alert("publish error") )
      .receive("timeout", resp => alert("timeout error") )

  messageInput.value = ""
  console.log("publishing message")
})

room.on("new_message", msg => {
  messagesContainer.innerHTML += renderMessage(msg)
  messagesContainer.scrollTop = messagesContainer.scrollHeight
})

room.join()
  .receive("ok", resp => console.log(`joined room ${roomId}`, resp) )
  .receive("error", reason => console.log(`failed to join room ${roomId}`, reason) )
  .receive("timeout", () => console.log(`timeout joining room ${roomId}`) )
