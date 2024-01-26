import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {
  console.log("socket server running...");

    socket.on("mousedown", (coordinates) => {
        socket.broadcast.emit("mousedown", coordinates);
    });

    socket.on("mousemove", (coordinates) => {
        socket.broadcast.emit("mousemove", coordinates);
    });

    socket.on("pencil-changed", (pencil) => {
        socket.broadcast.emit("pencil-changed", pencil);
    });

    socket.on("change-color", (color) => {
        socket.broadcast.emit("change-color", color);
    });

    socket.on("use-eraser", () => socket.broadcast.emit("use-eraser"));

    socket.on("canvas-resize", () => socket.broadcast.emit("canvas-resize"));

    socket.on("mouseup-event", () => {
        console.log("mouse-up-event");
        socket.broadcast.emit("mouseup-event");
    });

    socket.on("undo-changes", () => socket.broadcast.emit("undo-changes"));

    socket.on("redo-changes", () => socket.broadcast.emit("redo-changes"));

});

httpServer.listen(5000);