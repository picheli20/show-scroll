import { setShowLoading, setShows } from '../actions/show.actions';
import { initialState, showReducer } from './show.reducer';

describe('ShowReducer', () => {
  it('should return default state', () => {
    const action = { type: 'Unknown' };
    const state = showReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should set loading state', () => {
    const action = setShowLoading(true);
    const state = showReducer(initialState, action);

    expect(state.isLoading).toBe(true);
  });

  it('should set shows and process data', () => {
    const mockShows = [
      { id: 1, name: 'Show 1', rating: { average: 5 }, genres: ['Drama'] },
      { id: 2, name: 'Show 2', rating: { average: 8 }, genres: ['Action'] },
      { id: 3, name: 'Show 3', rating: { average: 9 }, genres: ['Drama', 'Action'] }
    ];

    const action = setShows(mockShows as any);
    const state = showReducer(initialState, action);

    expect(state.shows).toEqual(mockShows as any);

    // Check popular shows (sorted by rating desc)
    expect(state.mostPopularShows[0].id).toBe(3);
    expect(state.mostPopularShows[1].id).toBe(2);
    expect(state.mostPopularShows[2].id).toBe(1);

    // Check shows by genre
    expect(state.showsByGenre.length).toBe(2); // Action, Drama

    const actionGenre = state.showsByGenre.find(g => g.name === 'Action');
    expect(actionGenre?.total).toBe(2); // Show 2, Show 3

    const dramaGenre = state.showsByGenre.find(g => g.name === 'Drama');
    expect(dramaGenre?.total).toBe(2); // Show 1, Show 3
  });
});
