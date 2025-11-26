import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { provideMockStore } from '@ngrx/store/testing';
import { getRandomPopularShow, getShowsByGenre, isShowLoading } from 'src/app/store/selectors/show.selector';
import { HomePage } from './home.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [
        provideMockStore({
          selectors: [
            { selector: getShowsByGenre, value: [] },
            { selector: getRandomPopularShow, value: { id: 1, name: 'Test', image: { medium: 'img' } } },
            { selector: isShowLoading, value: false }
          ]
        })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
