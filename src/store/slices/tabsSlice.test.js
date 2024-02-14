import tabsReducer, {
  setCurrentTab
} from './tabsSlice';
import { initialState } from './tabsSlice';

describe('tabsSlice', () => {
  it('should return default state when passed an empty state', () => {
    const result = tabsReducer(undefined, { type: ''});

    expect(result).toEqual(initialState);
  });

  it('should set current tab', () => {
    const action = { type: setCurrentTab.type, payload: 'fillings' }

    const result = tabsReducer({ currentTab: 'buns' }, action);

    expect(result.currentTab).toBe('fillings');
  });
});
