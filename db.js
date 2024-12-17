const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("DB_URI:", process.env.DB_URI); // DB_URI 값 출력
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB 연결 성공");
    } catch (err) {
        console.error("MongoDB 연결 실패");
        console.error("오류 메시지:", err.message); // 오류 메시지 출력
        console.error("오류 스택:", err.stack); // 오류 스택 출력
        process.exit(1);
    }
};

module.exports = connectDB;