import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectRandomPopularShow, selectShowsByGenre } from 'src/app/store/selectors/show.selector';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  store = inject(Store);

  showsByGenre = this.store.selectSignal(selectShowsByGenre);
  randomShow = this.store.selectSignal(selectRandomPopularShow);
}
