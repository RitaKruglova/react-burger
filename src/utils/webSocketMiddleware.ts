import { TWebSocketResponse } from "./types";

interface IWSStartAction {
  type: 'webSocket/startAllOrders' | 'webSocket/startMyOrders';
}

interface IWSCloseAction {
  type: 'webSocket/close';
}

type TWSAction = IWSStartAction | IWSCloseAction;

export const webSocketMiddleware = (wsUrl: string, isAllOrders: boolean = true) => (store: { dispatch: Function }) => {
  let socket: WebSocket | null = null;

  return (next: Function) => (action: TWSAction) => {
    const actionTypeStart = isAllOrders ? 'webSocket/startAllOrders' : 'webSocket/startMyOrders';
    const actionTypeSet = isAllOrders ? 'webSocket/setAllOrders' : 'webSocket/setMyOrders';

    switch (action.type) {
      case actionTypeStart:
        if (socket !== null) {
          socket.close();
        }
        socket = new WebSocket(wsUrl);
        socket.onopen = () => store.dispatch({ type: 'webSocket/connectionSuccess' });
        socket.onerror = () => store.dispatch({ type: 'webSocket/connectionError' });
        socket.onmessage = (event) => { 
          const data = JSON.parse(event.data);
          store.dispatch({ type: actionTypeSet, payload: data.orders});
          store.dispatch({ type: 'webSocket/setTotal', payload: {total: data.total, totalToday: data.totalToday}})
        }
        socket.onclose = () => store.dispatch({ type: 'webSocket/connectionClosed' });
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