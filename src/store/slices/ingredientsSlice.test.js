import ingredientsReducer, {
  addIngredient,
  removeIngredient,
  addBun,
  setCurrentIngredient,
  dropIngredient,
  cleanDraggedIngredients,
  cleanCounters,
  fetchIngredients,
  initialBun
} from './ingredientsSlice';
import { initialState } from './ingredientsSlice';
import { api } from '../../utils/Api';

jest.mock('../../utils/Api', () => ({
  api: {
    getIngredients: jest.fn()
  }
}));

const testIngredient = {
  "_id":"60666c42cc7b410027a1a9b1",
  "name":"Краторная булка N-200i",
  "type":"bun",
  "proteins":80,
  "fat":24,
  "carbohydrates":53,
  "calories":420,
  "price":1255,
  "image":"https://code.s3.yandex.net/react/code/bun-02.png",
  "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
  "__v":0,
  "uuid": '1'
}

const testCountedIngredient = {
  ...testIngredient,
  count: 1
};

const testCountedBun = {
  ...testIngredient,
  count: 2
};

describe('ingredientsSlice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully return ingredients', async () => {
    const mockResponse = { data: 'some data' };
    api.getIngredients.mockResolvedValue(mockResponse);
    const dispatch = jest.fn();
    const getState = jest.fn();

    await fetchIngredients()(dispatch, getState, undefined);

    expect(api.getIngredients).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'ingredients/fetchIngredients/fulfilled',
      payload: mockResponse.data,
      meta: expect.objectContaining({
        arg: undefined,
        requestStatus: 'fulfilled'
      })
    }));
  });

  it('should return default state when passed an empty state', () => {
    const result = ingredientsReducer(undefined, { type: ''});

    expect(result).toEqual(initialState);
  });

  it('should add ingredient', () => {
    const action = { type: addIngredient.type, payload: testIngredient }

    const result = ingredientsReducer({ draggedIngredients: [], dataIngredients: [testIngredient]}, action);

    expect(result.draggedIngredients).toEqual([testIngredient]);
    expect(result.dataIngredients[0].count).toEqual(1);
  });

  it('should increase ingredient', () => {
    const action = { type: addIngredient.type, payload: testCountedIngredient }

    const result = ingredientsReducer({ draggedIngredients: [testCountedIngredient], dataIngredients: [testCountedIngredient]}, action);

    expect(result.draggedIngredients).toEqual([testCountedIngredient, testCountedIngredient]);
    expect(result.dataIngredients[0].count).toEqual(2);
  });

  it('should remove ingredients', () => {
    const action = { type: removeIngredient.type, payload: testCountedIngredient }

    const result = ingredientsReducer({ draggedIngredients: [testCountedIngredient], dataIngredients: [testCountedIngredient]}, action);

    expect(result.draggedIngredients).toEqual([]);
    expect(result.dataIngredients[0].count).toEqual(0);
  });

  it('should add bun', () => {
    const action = { type: addBun.type, payload: testIngredient }

    const result = ingredientsReducer({ bun: {"_id": 1 }, dataIngredients: [testIngredient]}, action);

    expect(result.dataIngredients[0].count).toEqual(2);
    expect(result.bun).toEqual(testIngredient);
  });

  it('should do nothing if bun is the same', () => {
    const action = { type: addBun.type, payload: testCountedBun }

    const result = ingredientsReducer({ bun: testCountedBun, dataIngredients: [testCountedBun]}, action);

    expect(result.bun).toEqual(testCountedBun);
    expect(result.dataIngredients[0].count).toEqual(2);
  });

  it('should set current ingredient', () => {
    const action = { type: setCurrentIngredient.type, payload: testIngredient }

    const result = ingredientsReducer({ currentIngredient: {} }, action);

    expect(result.currentIngredient).toEqual(testIngredient);
  });

  it('should change ingredient position in draggedIngredients', () => {
    const action = { type: dropIngredient.type, payload: { ingredient: { "uuid": 0 }, index: 1 } }

    const result = ingredientsReducer({ draggedIngredients: [{ "uuid": '4' }, { "uuid": '2' }, { "uuid": 0 }, { "uuid": '3' }] }, action);

    expect(result.draggedIngredients).toEqual([{ "uuid": '4' }, { "uuid": 0 }, { "uuid": '2' }, { "uuid": '3' }]);
  });

  it('should clean draggedIngredients and bun', () => {
    const action = { type: cleanDraggedIngredients.type }

    const result = ingredientsReducer({ draggedIngredients: [testCountedIngredient], bun: testCountedBun }, action);

    expect(result.draggedIngredients).toEqual([]);
    expect(result.bun).toEqual(initialBun);
  });

  it('should clean all counters', () => {
    const action = { type: cleanCounters.type }

    const result = ingredientsReducer({ dataIngredients: [testCountedIngredient, testCountedBun]}, action);

    expect(result.dataIngredients[0].count).toEqual(0);
    expect(result.dataIngredients[1].count).toEqual(0);
  });
})