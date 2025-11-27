import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Share } from '@capacitor/share';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { Show } from 'src/app/interfaces/show.interface';
import { ShowApiService } from 'src/app/services/http/show-api.service';
import { PageService } from 'src/app/services/page.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: 'detail.page.html',
  styleUrls: ['detail.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private showApiService = inject(ShowApiService);
  private pageService = inject(PageService);
  private loadingController = inject(LoadingController);

  show = signal<Show | null>(null);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');


    const loading = await this.loadingController.create();

    loading.present();
    this.showApiService.detail(`${id}`).pipe(
      finalize(() => loading.dismiss()),
    ).subscribe(data => {
      this.show.set(data);
    })
  }

  async share(show: Show) {
    const data = {
      title: show.name,
      text: `Check out "${show.name}" on ShowScroll!`,
      url: `${environment.appUrl}${window.location.pathname}`,
    };

    if (this.pageService.isApp) {
      await Share.share(data);

      return;
    }

    navigator.share(data);
  }
}
