import {io} from "socket.io-client";

const socket = io("https://chatconf.herokuapp.com/",{transports: ['websocket'], upgrade: false ,autoConnect: false})

export default socket;