import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { setViewingGenre } from 'src/app/store/actions/page.actions';
import { selectViewingGenre } from 'src/app/store/selectors/page.selector';
import { selectRandomPopularShow, selectShowsByGenre } from 'src/app/store/selectors/show.selector';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  store = inject(Store);

  viewingGenre = this.store.selectSignal(selectViewingGenre);

  showsByGenre = this.store.selectSignal(selectShowsByGenre);
  randomShow = this.store.selectSignal(selectRandomPopularShow);

  scrollHandler() {
    this.store.dispatch(setViewingGenre(undefined));
  }

  genreScrollHandler(genre: string) {
    this.store.dispatch(setViewingGenre(genre));
  }
}
