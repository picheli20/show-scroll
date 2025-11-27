import { Theme } from '../../enums/theme.enum';
import { PageState } from '../interfaces/page.interface';
import { selectIsLoading, selectTheme, selectViewingGenre } from './page.selector';

describe('Page Selectors', () => {
  const mockState: { page: PageState } = {
    page: {
      isLoading: true,
      theme: Theme.DARK,
      viewingGenre: undefined,
    },
  };

  describe('selectIsLoading', () => {
    it('should select isLoading from state', () => {
      const result = selectIsLoading(mockState);
      expect(result).toBe(true);
    });

    it('should return false when isLoading is false', () => {
      const state: { page: PageState } = {
        page: { isLoading: false, theme: Theme.LIGHT, viewingGenre: undefined },
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
        page: { isLoading: false, theme: Theme.LIGHT, viewingGenre: undefined },
      };
      expect(selectTheme(state)).toBe(Theme.LIGHT);
    });
  });

  describe('selectViewingGenre', () => {
    it('should select viewingGenre from state', () => {
      const result = selectViewingGenre(mockState);
      expect(result).toBeUndefined();
    });

    it('should return genre name when set', () => {
      const state: { page: PageState } = {
        page: { isLoading: false, theme: Theme.DARK, viewingGenre: 'Drama' },
      };
      expect(selectViewingGenre(state)).toBe('Drama');
    });

    it('should return undefined when genre is cleared', () => {
      const state: { page: PageState } = {
        page: { isLoading: false, theme: Theme.DARK, viewingGenre: undefined },
      };
      expect(selectViewingGenre(state)).toBeUndefined();
    });
  });
});
