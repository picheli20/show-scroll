import { Component, HostListener, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { SearchModalComponent } from '../search-modal/search-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  imports: [IonicModule],
})
export class HeaderComponent {
  private modalController = inject(ModalController);

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
}
