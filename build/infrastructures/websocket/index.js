"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var socketio = require("socket.io");

var webSocket = function webSocket(server) {
  var io = socketio(server);
  io.on("connection", function (socket) {
    console.log("new socket connect", socket);
  });
};

var _default = webSocket;
exports["default"] = _default;