import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { setViewingGenre } from 'src/app/store/actions/page.actions';
import { selectViewingGenre } from 'src/app/store/selectors/page.selector';
import { selectIsShowLoading, selectRandomPopularShow, selectShowsByGenre } from 'src/app/store/selectors/show.selector';
import { HomePage } from './home.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectShowsByGenre, value: [] },
            { selector: selectRandomPopularShow, value: { id: 1, name: 'Test', image: { medium: 'img' }, rating: { average: 5 }, genres: ['Drama'] } },
            { selector: selectIsShowLoading, value: false },
            { selector: selectViewingGenre, value: undefined }
          ]
        })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have viewingGenre signal', () => {
    expect(component.viewingGenre()).toBeUndefined();
  });

  it('should dispatch setViewingGenre(undefined) when scrollHandler is called', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.scrollHandler();

    expect(dispatchSpy).toHaveBeenCalledWith(setViewingGenre(undefined));
  });

  it('should dispatch setViewingGenre with genre name when genreScrollHandler is called', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const genreName = 'Drama';

    component.genreScrollHandler(genreName);

    expect(dispatchSpy).toHaveBeenCalledWith(setViewingGenre(genreName));
  });

  it('should update viewingGenre when genre scroll handler is called', () => {
    store.overrideSelector(selectViewingGenre, 'Action');
    store.refreshState();

    expect(component.viewingGenre()).toBe('Action');
  });
});
