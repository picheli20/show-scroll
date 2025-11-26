import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CarouselComponent } from 'src/app/components/carousel/carousel.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { PositionComponent } from 'src/app/components/position/position.component';
import { ShowThumbComponent } from 'src/app/components/show-thumb/show-thumb.component';
import { HomePage } from './components/home.page';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    HomeRoutingModule,

    ShowThumbComponent,
    CarouselComponent,
    PositionComponent,
    HeaderComponent,
  ],
  declarations: [HomePage]
})
export class HomeModule {}
