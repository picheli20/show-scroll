import { Theme } from '../../enums/theme.enum';
import { PageState } from '../interfaces/page.interface';
import { selectIsLoading, selectTheme } from './page.selector';

describe('Page Selectors', () => {
  const mockState: { page: PageState } = {
    page: {
      isLoading: true,
      theme: Theme.DARK,
    },
  };

  describe('selectIsLoading', () => {
    it('should select isLoading from state', () => {
      const result = selectIsLoading(mockState);
      expect(result).toBe(true);
    });

    it('should return false when isLoading is false', () => {
      const state: { page: PageState } = {
        page: { isLoading: false, theme: Theme.LIGHT },
      };
      expect(selectIsLoading(state)).toBe(false);
    });
  });

  describe('selectTheme', () => {
    it('should select theme from state', () => {
      const result = selectTheme(mockState);
      expect(result).toBe(Theme.DARK);
    });

    it('should return light theme when set', () => {
      const state: { page: PageState } = {
        page: { isLoading: false, theme: Theme.LIGHT },
      };
      expect(selectTheme(state)).toBe(Theme.LIGHT);
    });
  });
});
