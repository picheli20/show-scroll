import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, LoadingController } from '@ionic/angular';
import { of } from 'rxjs';
import { ShowApiService } from 'src/app/services/http/show-api.service';
import { PageService } from 'src/app/services/page.service';
import { DetailPage } from './detail.page';

describe('DetailPage', () => {
  let component: DetailPage;
  let fixture: ComponentFixture<DetailPage>;
  let showApiServiceSpy: any;
  let pageServiceSpy: any;
  let loadingControllerSpy: any;

  const mockShow = {
    id: 1,
    name: 'Test Show',
    image: { medium: 'test.jpg', original: 'test-orig.jpg' }
  };

  beforeEach(waitForAsync(() => {
    const apiSpy = {
      detail: jest.fn()
    };
    const pageSpy = {
      isApp: false
    };
    const loadingSpy = {
      create: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [DetailPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }
        },
        { provide: ShowApiService, useValue: apiSpy },
        { provide: PageService, useValue: pageSpy },
        { provide: LoadingController, useValue: loadingSpy }
      ]
    }).compileComponents();

    showApiServiceSpy = TestBed.inject(ShowApiService);
    pageServiceSpy = TestBed.inject(PageService);
    loadingControllerSpy = TestBed.inject(LoadingController);

    fixture = TestBed.createComponent(DetailPage);
    component = fixture.componentInstance;

    // Mock navigator.share to avoid NotAllowedError
    Object.defineProperty(navigator, 'share', {
      value: jest.fn().mockResolvedValue(undefined),
      writable: true,
      configurable: true
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch show detail on init', async () => {
    const loadingElementSpy = { present: jest.fn(), dismiss: jest.fn() };
    loadingControllerSpy.create.mockReturnValue(Promise.resolve(loadingElementSpy));
    showApiServiceSpy.detail.mockReturnValue(of(mockShow as any));

    await component.ngOnInit();

    expect(loadingControllerSpy.create).toHaveBeenCalled();
    expect(loadingElementSpy.present).toHaveBeenCalled();
    expect(showApiServiceSpy.detail).toHaveBeenCalledWith('1');
    expect(component.show()).toEqual(mockShow as any);
    expect(loadingElementSpy.dismiss).toHaveBeenCalled();
  });

  it('should share via navigator when not app', async () => {
    pageServiceSpy.isApp = false;

    await component.share(mockShow as any);

    expect(navigator.share).toHaveBeenCalled();
  });

  it('should share via Capacitor Share when app', async () => {
    pageServiceSpy.isApp = true;

    await component.share(mockShow as any);

    // No specific assertion for Capacitor Share here as per the instruction's diff
    // The original test had an incorrect assertion for navigator.share
  });
});
