import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
export const socket = io(API_URL);
