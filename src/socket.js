// src/socket.js
import { io } from "socket.io-client";

const socket = io("https://beezquiz-f7gpc0fefpfzaph6.koreasouth-01.azurewebsites.net", {
  transports: ["websocket"],
});

export default socket;
