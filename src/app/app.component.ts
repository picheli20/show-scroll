import { Component, inject, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Store } from '@ngrx/store';
import { PageService } from './services/page.service';
import { appInit } from './store/actions/page.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  private store = inject(Store);
  private pageService = inject(PageService);

  async scheduleReturnNotification() {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: 1,
          title: 'Come back!',
          body: 'Return to the app 😊',
          schedule: { at: new Date(Date.now() + 5 * 1000) }, // 5 seconds later
        }
      ]
    });
  }

  async scheduleLeaveNotification() {
    App.addListener('appStateChange', async ({ isActive }) => {
      if (!isActive) {
        // App moved to background or was closed
        await this.scheduleReturnNotification();
      } else {
        // Cancel notifications if user returns early
        await LocalNotifications.cancel({ notifications: [{ id: 1 }] });
      }
    });
  }

  async ngOnInit(): Promise<void> {
    if (this.pageService.isApp) {
      await LocalNotifications.requestPermissions();
      await this.scheduleLeaveNotification();
    }

    this.store.dispatch(appInit());
  }
}
