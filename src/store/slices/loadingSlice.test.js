import { fetchIngredients } from './ingredientsSlice';
import { fetchOrder } from './orderSlice';
import loadingReducer from './loadingSlice';
import { initialState } from './loadingSlice';

describe('loadingSlice', () => {
  it('should handle initial state', () => {
    expect(loadingReducer(undefined, { type: 'unknown' })).toEqual({
      isLoading: false,
    });
  });

  it('should handle fetchIngredients pending', () => {
    const action = { type: fetchIngredients.pending.type };
    
    const result = loadingReducer(initialState, action);

    expect(result.isLoading).toBe(true);
  });

  it('should handle fetchIngredients fulfilled', () => {
    const action = { type: fetchIngredients.fulfilled.type, payload: [] };
    
    const result = loadingReducer({ ...initialState, isLoading: true }, action);

    expect(result.isLoading).toBe(false);
  });

  it('should handle fetchIngredients rejected', () => {
    const action = { type: fetchIngredients.rejected.type, error: {} };
    
    const result = loadingReducer({ ...initialState, isLoading: true }, action);

    expect(result.isLoading).toBe(false);
  });

  it('should handle fetchOrder pending', () => {
    const action = { type: fetchOrder.pending.type };

    const result = loadingReducer(initialState, action);

    expect(result.isLoading).toBe(true);
  });

  it('should handle fetchOrder fulfilled', () => {
    const action = { type: fetchOrder.fulfilled.type, payload: {} };
    
    const result = loadingReducer({ ...initialState, isLoading: true }, action);

    expect(result.isLoading).toBe(false);
  });

  it('should handle fetchOrder rejected', () => {
    const action = { type: fetchOrder.rejected.type, error: {} };

    const result = loadingReducer({ ...initialState, isLoading: true }, action);

    expect(result.isLoading).toBe(false);
  });
});