import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Theme } from './enums/theme.enum';
import { appInit, setTheme } from './store/actions/page.actions';
import { getTheme } from './store/selectors/page.selector';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  darkThemeActive = new FormControl(true);

  private store = inject(Store);
  private theme$ = this.store.select(getTheme);

  ngOnInit(): void {
    this.store.dispatch(appInit());

    this.theme$.subscribe(theme => this.darkThemeActive.setValue(theme === Theme.DARK));
    this.darkThemeActive.valueChanges.subscribe(isDark => this.store.dispatch(setTheme(isDark ? Theme.DARK : Theme.LIGHT)));
  }
}
