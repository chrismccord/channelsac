class RoomsChannel < ApplicationCable::Channel
  def subscribed
    @topic = "rooms:#{rand(1..8)}"
    stream_from @topic
  end

  def publish_message(data)
    ActionCable.server.broadcast(@topic,
      body: data["body"],
      username: data["username"],
      started: data["started"]
    )
  end
end
