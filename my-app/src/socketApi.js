import io from "socket.io-client";

let socket;

export const init = () => {
  console.log("Sunucuya bağlanılıyor...");
  socket = io("http://localhost:3000", {
    transports: ["websocket"],
  });
  socket.on("connect", () => console.log("Sunucuya bağlandı..."));
};

export const sendMessage = (message) => {
  if (socket) socket.emit("new-message", message);
};

export const subscribeChat = (cb) => {
  if (!socket) return;

  socket.on("receive-message", (message) => {
    console.log("Yeni mesaj var", message);
    cb(message);
  });
};

export const subscribeOldChat = (cb) => {
  if (!socket) return;

  socket.on("message-list", (messages) => {
    console.log("Eski mesajlar yüklendi");
    cb(messages);
  });
};
