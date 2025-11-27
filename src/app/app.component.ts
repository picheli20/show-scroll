import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { appInit } from './store/actions/page.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  private store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(appInit());
  }
}
