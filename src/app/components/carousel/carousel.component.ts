import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule],
})
export class CarouselComponent {
  scrolled = output();

  scrollHandler() {
    this.scrolled.emit();
  }
}
