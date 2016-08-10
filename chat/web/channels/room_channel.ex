defmodule Chat.RoomChannel do
  use Chat.Web, :channel

  def join("room:" <> _id, _params, socket) do
    {:ok, socket}
  end

  def handle_in("publish_message", %{"body" => body, "username" => user}, socket) do
    broadcast!(socket, "new_message", %{body: body, username: user})
    {:reply, :ok, socket}
  end
end
