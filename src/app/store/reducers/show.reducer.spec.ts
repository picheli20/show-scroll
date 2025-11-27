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
  });
});
