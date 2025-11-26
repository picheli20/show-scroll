import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { getRandomPopularShow, getShowsByGenre } from 'src/app/store/selectors/show.selector';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  store = inject(Store);

  showsByGenre = this.store.selectSignal(getShowsByGenre);
  randomShow = this.store.selectSignal(getRandomPopularShow);
}
