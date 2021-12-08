import WebSocket from 'isomorphic-ws';

export function terminateWs(ws: WebSocket | unknown) {
  // #168: ws.terminate() undefined in browsers
  if (typeof ws?.terminate === 'function') {
    ws.terminate();
  }
}
