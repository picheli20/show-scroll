import { Component, output } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  scrolled = output();

  scrollHandler() {
    this.scrolled.emit();
  }
}
