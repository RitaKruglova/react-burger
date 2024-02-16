import { Dispatch, Middleware, UnknownAction, ActionCreatorWithoutPayload, ActionCreatorWithPayload, MiddlewareAPI } from "@reduxjs/toolkit";
import { wsClose, wsConnectionClosed, wsConnectionError, wsConnectionSuccess, wsSetAllOrders, wsSetMyOrders, wsSetTotal, wsStartAllOrders, wsStartMyOrders } from "../constants/constants";
import { TAppDispatch, TRootState } from "./types";

interface IWSStartAction {
  type: typeof wsStartAllOrders | typeof wsStartMyOrders;
}

interface IWSCloseAction {
  type: typeof wsClose;
}

export type TWSAction = IWSStartAction | IWSCloseAction;

function isTWSAction(action: any): action is TWSAction {
  return [wsStartAllOrders, wsStartMyOrders, wsClose].includes(action.type);
}

export const webSocketMiddleware = (wsUrl: string, isAllOrders: boolean = true): Middleware => (store: MiddlewareAPI<TAppDispatch, TRootState>) => {
  let socket: WebSocket | null = null;

  return next => action => {
    if (!isTWSAction(action)) {
      return next(action);
    }
    const actionTypeStart = isAllOrders ? wsStartAllOrders : wsStartMyOrders;
    const actionTypeSet = isAllOrders ? wsSetAllOrders : wsSetMyOrders;


    switch (action.type) {
      case actionTypeStart:
        if (socket !== null) {
          socket.close();
        }
        wsUrl += `?token=${localStorage.getItem('accessToken')}`;
        socket = new WebSocket(wsUrl);
        socket.onopen = () => store.dispatch({ type: wsConnectionSuccess });
        socket.onerror = () => store.dispatch({ type: wsConnectionError });
        socket.onmessage = (event) => { 
          const data = JSON.parse(event.data);
          store.dispatch({ type: actionTypeSet, payload: data.orders});
          store.dispatch({ type: wsSetTotal, payload: {total: data.total, totalToday: data.totalToday}})
        }
        socket.onclose = () => store.dispatch({ type: wsConnectionClosed });
        break;
      case wsClose:
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        break;
    }

    return next(action);
  };
};