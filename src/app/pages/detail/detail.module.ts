import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ShowThumbComponent } from 'src/app/components/show-thumb/show-thumb.component';
import { DetailPage } from './components/detail.page';
import { DetailRoutingModule } from './detail-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    DetailRoutingModule,
    ShowThumbComponent,
  ],
  declarations: [DetailPage]
})
export class DetailModule {}
