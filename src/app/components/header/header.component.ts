import { ChangeDetectionStrategy, Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Theme } from 'src/app/enums/theme.enum';
import { setTheme } from 'src/app/store/actions/page.actions';
import { selectTheme } from 'src/app/store/selectors/page.selector';
import { SearchModalComponent } from '../search-modal/search-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  imports: [IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private modalController = inject(ModalController);
  private store = inject(Store);

  private theme$ = this.store.select(selectTheme);
  isDarkTheme = signal(true);

  @HostListener('window:keydown.control.k', ['$event'])
  @HostListener('window:keydown.meta.k', ['$event'])
  handleCmdK(event: Event) {
    event.preventDefault();
    this.openSearchModal();
  }

  async openSearchModal() {
    const modal = await this.modalController.create({
      component: SearchModalComponent,
      cssClass: 'spotlight-modal',
      backdropDismiss: true,
      showBackdrop: true,
    });
    await modal.present();
  }

  ngOnInit(): void {
    this.theme$.subscribe(theme => this.isDarkTheme.set(theme === Theme.DARK));
  }

  toggleTheme() {
    this.store.dispatch(setTheme(this.isDarkTheme() ? Theme.LIGHT : Theme.DARK));
  }
}
