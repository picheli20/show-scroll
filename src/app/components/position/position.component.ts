import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-position',
  templateUrl: 'position.component.html',
  styleUrls: ['position.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionComponent {
  position = input.required<number>();
}
