import { ShowState } from '../interfaces/show.interface';
import * as selectors from './show.selector';

describe('ShowSelectors', () => {
  const initialState: ShowState = {
    isLoading: false,
    shows: [
      { id: 1, name: 'Show 1', rating: { average: 5 }, genres: ['Drama'] },
      { id: 2, name: 'Show 2', rating: { average: 8 }, genres: ['Action'] },
      { id: 3, name: 'Show 3', rating: { average: 9 }, genres: ['Drama', 'Action'] }
    ] as any
  };

  it('should select loading state', () => {
    const result = selectors.isShowLoading.projector(initialState);
    expect(result).toBe(false);
  });

  it('should select shows', () => {
    const result = selectors.getShows.projector(initialState);
    expect(result.length).toBe(3);
  });

  it('should select shows by genre', () => {
    const result = selectors.getShowsByGenre.projector(initialState.shows);
    expect(result.length).toBe(2);

    const actionGenre = result.find(g => g.name === 'Action');
    expect(actionGenre?.total).toBe(2);
  });

  it('should select popular shows', () => {
    const result = selectors.getPopularShows.projector(initialState.shows);
    expect(result.length).toBe(3);
    expect(result[0].id).toBe(3); // Highest rating
  });

  it('should select random popular show', () => {
    const popularShows = selectors.getPopularShows.projector(initialState.shows);
    const result = selectors.getRandomPopularShow.projector(popularShows);

    expect(result).toBeTruthy();
    expect(result.position).toBeGreaterThan(0);
    expect(popularShows).toContainEqual(expect.objectContaining({ id: result.id }));
  });
});
