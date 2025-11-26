import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { finalize } from 'rxjs';
import { Show } from 'src/app/interfaces/show.interface';
import { ShowApiService } from 'src/app/services/http/show-api.service';
import { getPopularShows } from 'src/app/store/selectors/show.selector';
import { ShowThumbComponent } from '../show-thumb/show-thumb.component';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
  imports: [IonicModule, ReactiveFormsModule, ShowThumbComponent, CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchModalComponent implements OnInit {
  private showApiService = inject(ShowApiService);
  private modalController = inject(ModalController);
  private store = inject(Store);

  query = new FormControl('', [Validators.minLength(3), Validators.required]);

  results = signal<Show[]>([]);
  isPopular = signal(false);
  isLoading = signal(false);

  ngOnInit(): void {
    this.pickPopulars();
  }

  onSearch() {
    if (this.query.invalid) {
      this.pickPopulars();
      return;
    }

    this.isLoading.set(true);
    this.showApiService.search(this.query.value ?? '').pipe(
      finalize(() => this.isLoading.set(false)),
    ).subscribe(data => {
      if (data.length === 0) {
        this.pickPopulars();
        return;
      }

      this.isPopular.set(false);
      this.results.set(data.map(({ show }) => show));
    })
  }

  private pickPopulars() {
    const shows = this.store.selectSignal(getPopularShows)();

    this.isPopular.set(true);
    this.results.set(shows);
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
