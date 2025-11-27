import { Theme } from '../../enums/theme.enum';
import { setTheme } from '../actions/page.actions';
import { initialState, pageReducer } from './page.reducer';

describe('pageReducer', () => {
  describe('setTheme', () => {
    it('should set theme to LIGHT', () => {
      const action = setTheme(Theme.LIGHT);
      const state = pageReducer(initialState, action);

      expect(state.theme).toBe(Theme.LIGHT);
      expect(state.isLoading).toBe(initialState.isLoading);
    });

    it('should set theme to DARK', () => {
      const action = setTheme(Theme.DARK);
      const state = pageReducer({ ...initialState, theme: Theme.LIGHT }, action);

      expect(state.theme).toBe(Theme.DARK);
      expect(state.isLoading).toBe(initialState.isLoading);
    });
  });
});
