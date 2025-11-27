import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { provideMockStore } from '@ngrx/store/testing';
import { selectIsShowLoading, selectRandomPopularShow, selectShowsByGenre } from 'src/app/store/selectors/show.selector';
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
            { selector: selectShowsByGenre, value: [] },
            { selector: selectRandomPopularShow, value: { id: 1, name: 'Test', image: { medium: 'img' }, rating: { average: 5 }, genres: ['Drama'] } },
            { selector: selectIsShowLoading, value: false }
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
