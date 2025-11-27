import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { ShowApiService } from 'src/app/services/http/show-api.service';
import { selectPopularShows } from 'src/app/store/selectors/show.selector';
import { SearchModalComponent } from './search-modal.component';

describe('SearchModalComponent', () => {
  let component: SearchModalComponent;
  let fixture: ComponentFixture<SearchModalComponent>;
  let showApiServiceSpy: any;
  let modalControllerSpy: any;
  let routerDepSpy: any;

  const mockShows = [
    { id: 1, name: 'Show 1', rating: { average: 8 }, genres: ['Drama'] },
    { id: 2, name: 'Show 2', rating: { average: 9 }, genres: ['Action'] }
  ];

  beforeEach(waitForAsync(() => {
    const apiSpy = {
      search: jest.fn()
    };
    const modalSpy = {
      dismiss: jest.fn()
    };
    const routerSpy = {
      navigate: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        SearchModalComponent // Import standalone component
      ],
      providers: [
        { provide: ShowApiService, useValue: apiSpy },
        { provide: ModalController, useValue: modalSpy },
        { provide: Router, useValue: routerSpy },
        provideMockStore({
          selectors: [
            { selector: selectPopularShows, value: mockShows }
          ]
        })
      ]
    }).compileComponents();

    showApiServiceSpy = TestBed.inject(ShowApiService);
    fixture = TestBed.createComponent(SearchModalComponent);
    component = fixture.componentInstance;
    const ctrl = fixture.debugElement.injector.get(ModalController);

    ctrl.dismiss = modalSpy.dismiss;
    routerSpy.navigate = routerSpy.navigate;

    jest.spyOn(ctrl, 'dismiss');
    jest.spyOn(routerSpy, 'navigate');

    modalControllerSpy = ctrl as any;
    routerDepSpy = routerSpy as any;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with popular shows', () => {
    expect(component.isPopular()).toBe(true);
    expect(component.results()).toEqual(mockShows as any);
  });

  it('should search when query is valid', () => {
    const searchResults = [{ show: { id: 3, name: 'Search Result' } }];
    showApiServiceSpy.search.mockReturnValue(of(searchResults as any));

    component.query.setValue('test');
    component.onSearch();

    expect(showApiServiceSpy.search).toHaveBeenCalledWith('test');
    expect(component.isPopular()).toBe(false);
    expect(component.results().length).toBe(1);
  });

  it('should revert to popular shows if search is invalid', () => {
    component.query.setValue('ab'); // Too short
    component.onSearch();

    expect(showApiServiceSpy.search).not.toHaveBeenCalled();
    expect(component.isPopular()).toBe(true);
  });

  it('should revert to popular shows if search returns empty', () => {
    showApiServiceSpy.search.mockReturnValue(of([]));

    component.query.setValue('test');
    component.onSearch();

    expect(component.isPopular()).toBe(true);
  });

  it('should dismiss modal', async () => {
    await component.dismiss(1);

    expect(modalControllerSpy.dismiss).toHaveBeenCalled();
    expect(routerDepSpy.navigate).toHaveBeenCalledWith(['/detail', 1]);
  });

  it('should focus searchbar on ionViewWillEnter', () => {
    const setFocusSpy = jest.fn();
    component.searchbar = { setFocus: setFocusSpy } as any;

    component.ionViewWillEnter();

    expect(setFocusSpy).toHaveBeenCalled();
  });
});
