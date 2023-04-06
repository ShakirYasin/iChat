import { useMemo } from 'react';
import io from 'socket.io-client';

const useSocket = (endpoint = import.meta.env.VITE_FLY_ENDPOINT) => {
  const socket = useMemo(() => io(endpoint, {
    transports:  [ "websocket", "polling" ],
    port: "8080",
    host: import.meta.env.VITE_FLY_ENDPOINT
  }), [endpoint]);
  return socket;
};
    
export default useSocket;