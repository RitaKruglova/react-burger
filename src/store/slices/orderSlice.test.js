import orderReducer, {
  removeOrderNumber,
  setCurrentOrder,
  removeCurrentOrder,
  fetchOrder
} from './orderSlice';
import { initialState } from './orderSlice';
import { api } from '../../utils/Api';

jest.mock('../../utils/Api', () => ({
  api: {
    createOrder: jest.fn()
  }
}));

const testOrder = { number: 1, name: 'new test name' }

describe('orderSlice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully create order', async () => {
    const mockResponse = { success: true };
    api.createOrder.mockResolvedValue(mockResponse);
    const dispatch = jest.fn();
    const getState = jest.fn();
    const ingredientIds = ['1', '2', '3', '4'];
    const token = 'test';

    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(token);

    await fetchOrder(ingredientIds)(dispatch, getState, undefined);
  
    expect(api.createOrder).toHaveBeenCalledWith(ingredientIds, token);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'order/fetchOrder/fulfilled',
      payload: mockResponse,
      meta: expect.objectContaining({
        arg: ingredientIds,
        requestStatus: 'fulfilled'
      })
    }));

    jest.restoreAllMocks();
  });

  it('should return default state when passed an empty state', () => {
    const result = orderReducer(undefined, { type: ''});

    expect(result).toEqual(initialState);
  });

  it('should remove order number', () => {
    const action = { type: removeOrderNumber.type }

    const result = orderReducer({ orderNumber: 1 }, action);

    expect(result.orderNumber).toBe(null);
  });

  it('should set current order', () => {
    const action = { type: setCurrentOrder.type, payload: testOrder }

    const result = orderReducer({ currentOrder: null }, action);

    expect(result.currentOrder).toEqual(testOrder);
  });

  it('should remove current order', () => {
    const action = { type: removeCurrentOrder.type }

    const result = orderReducer({ currentOrder: testOrder}, action);

    expect(result.currentOrder).toEqual(null);
  });
})