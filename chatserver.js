const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");
const Message = require("./models/Message");

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    console.log("클라이언트 연결:", socket.id);

    // 클라이언트가 메시지를 전송할 때
    socket.on("sendMessage", async ({ senderId, receiverId, content }) => {
        const newMessage = new Message({ senderId, receiverId, content });
        await newMessage.save();

        // 수신자에게 메시지 전달
        io.to(receiverId).emit("receiveMessage", newMessage);
    });

    // 클라이언트가 특정 방에 참여
    socket.on("joinRoom", (userId) => {
        socket.join(userId);
        console.log(`사용자 ${userId}가 방에 참여`);
    });

    socket.on("disconnect", () => {
        console.log("클라이언트 연결 해제:", socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`서버가 실행 중입니다: http://localhost:${PORT}`);
});
