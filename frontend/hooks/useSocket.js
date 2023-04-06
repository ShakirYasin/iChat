import { useMemo } from 'react';
import io from 'socket.io-client';

const useSocket = (endpoint = import.meta.env.VITE_SERVER_ENDPOINT) => {
  const socket = useMemo(() => io(endpoint, {
    transports:  [ "websocket", "polling" ]
  }), [endpoint]);
  return socket;
};
    
export default useSocket;