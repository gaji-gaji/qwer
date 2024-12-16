const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");
const Message = require("./models/Message");

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    console.log("클라이언트 연결:", socket.id);

    socket.on("sendMessage", async ({ senderId, receiverId, content }) => {
        const newMessage = new Message({ senderId, receiverId, content });
        await newMessage.save();
        io.to(receiverId).emit("receiveMessage", newMessage);
    });

    socket.on("joinRoom", (userId) => {
        socket.join(userId);
    });

    socket.on("disconnect", () => {
        console.log("클라이언트 연결 해제:", socket.id);
    });
});

server.listen(5000, () => {
    console.log("서버 실행 중: http://localhost:5000");
});
