import { Show } from 'src/app/interfaces/show.interface';

export interface ShowState {
  shows: Show[];
  mostPopularShows: Show[];
  showsByGenre: {
    name: string;
    total: number;
    all: Show[];
    populars: Show[];
  }[];
  isLoading: boolean;
}
