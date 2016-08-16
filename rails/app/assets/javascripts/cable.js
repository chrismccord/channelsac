// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//
//= require action_cable
//= require_self
//= require_tree ./channels

var App = {timer: {startedAt: 0, timer: null}}

$(document).ready(function(){
  App.cable = ActionCable.createConsumer()
  console.log("connection established")
  var nameInput = $("#name-input")
  var timerContainer = $("#timer")
  var messageInput = $("#message-input")
  var messagesContainer = $("#messages")
  var renderMessage =  function(msg) {
    return "<p> <b>" + msg.username + ": </b>" + msg.body + "</p>"
  }
  var getName = function(){
    var name = nameInput.val().toString()
    return(name === "" ? "guest" : name)
  }
  var now = function(){ return (new Date()).getTime() }

  var startTimer = function(){
    var startedAt = now()
    var interval = setInterval(function(){
      timerContainer.text("0s ...")
      var elapsed = (now() - startedAt) / 1000
      timerContainer.text(elapsed + "s ...")
    }, 100)
    return {timer: interval, startedAt: startedAt}
  }

  var stopTimer = function(timer){
    clearInterval(timer.timer)
    var elapsed = (now() - timer.startedAt) / 1000
    timerContainer.text(elapsed + "s ✅")
  }


  App.room = App.cable.subscriptions.create("RoomsChannel", {
    doPublish: function(){
      var msg = messageInput.val()
      App.room.publishMessage(msg)
      messageInput.val("")
      console.log("publishing message", msg)
    },

    connected: function(){
      messageInput.val("test")
      App.room.doPublish()
    },

    received: function(data) {
      if(data.started === App.timer.startedAt){
        stopTimer(App.timer)
        messageInput.prop("disabled", false)
        window.location.reload()
      }
      messagesContainer.removeClass('hidden')
      messagesContainer.append(renderMessage(data))
      messagesContainer.prop("scrollTop", messagesContainer.prop("scrollHeight"))
    },

    publishMessage: function(body) {
      App.timer = startTimer()
      messageInput.prop("disabled", true)
      this.perform("publish_message", {
        started: App.timer.startedAt,
        username: getName(),
        body: body
      })
    }
  })

  messageInput.keypress(function(event){
    if(event.which === 13){
      event.preventDefault()
      doPublish()
    }
  })

  $(App.room).on("received", function(event, data) {
    messagesContainer.append(renderMessage(data))
  })

  setTimeout(function(){ window.location.reload()}, 3000)

})
