import { TWebSocketResponse } from "./types";

interface IWSStartAction {
  type: 'webSocket/start';
}

interface IWSSendAction {
  type: 'webSocket/send';
  payload: TWebSocketResponse;
}

interface IWSCloseAction {
  type: 'webSocket/close';
}

type TWSAction = IWSStartAction | IWSSendAction | IWSCloseAction;

export const webSocketMiddleware = (wsUrl: string) => (store: { dispatch: Function }) => {
  let socket: WebSocket | null = null;

  return (next: Function) => (action: TWSAction) => {
    switch (action.type) {
      case 'webSocket/start':
        if (socket !== null) {
          socket.close();
        }
        socket = new WebSocket(wsUrl);
        socket.onopen = () => store.dispatch({ type: 'webSocket/wsConnectionSuccess' });
        socket.onerror = () => store.dispatch({ type: 'webSocket/wsConnectionError' });
        socket.onmessage = (event) => store.dispatch({ type: 'webSocket/wsSetAllOrders', payload: JSON.parse(event.data).orders});
        socket.onclose = () => store.dispatch({ type: 'webSocket/wsConnectionClosed' });
        break;
      case 'webSocket/close':
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        break;
    }

    return next(action);
  };
};