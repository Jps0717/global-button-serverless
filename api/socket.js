const { Server } = require("socket.io");

export default function handler(req, res) {
    if (res.socket.server.io) {
        console.log("Socket.io already running");
        return res.end();
    }

    const io = new Server(res.socket.server);
    let buttonClicks = 0;

    io.on("connection", (socket) => {
        console.log("a user connected");

        // Send the initial click count
        socket.emit("update", buttonClicks);

        // Listen for button click event
        socket.on("buttonClicked", () => {
            buttonClicks++;
            io.emit("update", buttonClicks);
        });

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });

    res.socket.server.io = io;
    res.end();
}
