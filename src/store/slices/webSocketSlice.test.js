import webSocketreducer, {
  connectionSuccess,
  connectionError,
  connectionClosed,
  setAllOrders,
  setMyOrders,
  setTotal
} from './webSocketSlice';
import { initialState } from './webSocketSlice';

const orders = [{ _id: 1 }, { _id: 2 }, { _id: 3 }];

describe('webSocketSlice', () => {
  it('should return default state when passed an empty state', () => {
    const result = webSocketreducer(undefined, { type: ''});

    expect(result).toEqual(initialState);
  });

  it('should connection be successfully', () => {
    const action = { type: connectionSuccess.type }

    const result = webSocketreducer({ wsConnected: false, error: true }, action);

    expect(result.wsConnected).toBeTruthy();
    expect(result.error).toBeFalsy();
  });

  it('should connection error', () => {
    const action = { type: connectionError.type }

    const result = webSocketreducer({ wsConnected: true, error: false }, action);

    expect(result.wsConnected).toBeFalsy();
    expect(result.error).toBeTruthy();
  });

  it('should connection be closed', () => {
    const action = { type: connectionClosed.type }

    const result = webSocketreducer({ wsConnected: true, error: true }, action);

    expect(result.wsConnected).toBeFalsy();
    expect(result.error).toBeFalsy();
  });

  it('should set all orders', () => {
    const action = { type: setAllOrders.type, payload: orders }

    const result = webSocketreducer({ allOrders: [] }, action);

    expect(result.allOrders).toEqual(orders);
  });

  it('should set my orders', () => {
    const action = { type: setMyOrders.type, payload: orders }

    const result = webSocketreducer({ myOrders: [] }, action);

    expect(result.myOrders).toEqual(orders);
  });

  it('should set total', () => {
    const action = { type: setTotal.type, payload: { total: 17235, totalToday: 537 } }

    const result = webSocketreducer({ total: null }, action);

    expect(result.total).toEqual({ total: 17235, totalToday: 537 });
  });
})