import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Show } from 'src/app/interfaces/show.interface';

@Component({
  selector: 'app-show-thumb',
  templateUrl: 'show-thumb.component.html',
  styleUrls: ['show-thumb.component.scss'],
  imports: [IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowThumbComponent {
  show = input.required<Show>();
  size = input<'medium' | 'original'>('medium');

  loaded = signal(false);
}
