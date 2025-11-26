import { ShowState } from '../interfaces/show.interface';
import * as selectors from './show.selector';

describe('ShowSelectors', () => {
  const initialState: ShowState = {
    isLoading: false,
    shows: [{ id: 1, name: 'Show 1' } as any],
    mostPopularShows: [
      { id: 1, name: 'Show 1' },
      { id: 2, name: 'Show 2' }
    ] as any,
    showsByGenre: [{ name: 'Action', total: 1 }] as any
  };

  it('should select loading state', () => {
    const result = selectors.isShowLoading.projector(initialState);
    expect(result).toBe(false);
  });

  it('should select shows', () => {
    const result = selectors.getShows.projector(initialState);
    expect(result.length).toBe(1);
  });

  it('should select shows by genre', () => {
    const result = selectors.getShowsByGenre.projector(initialState);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Action');
  });

  it('should select popular shows', () => {
    const result = selectors.getPopularShows.projector(initialState);
    expect(result.length).toBe(2);
  });

  it('should select random popular show', () => {
    const result = selectors.getRandomPopularShow.projector(initialState);
    expect(result).toBeTruthy();
    expect(result.position).toBeGreaterThan(0);
    expect(initialState.mostPopularShows).toContainEqual(expect.objectContaining({ id: result.id }));
  });
});
