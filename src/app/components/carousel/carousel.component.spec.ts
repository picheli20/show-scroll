import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CarouselComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit scrolled event when scrollHandler is called', () => {
    const scrolledSpy = jest.fn();
    component.scrolled.subscribe(scrolledSpy);

    component.scrollHandler();

    expect(scrolledSpy).toHaveBeenCalled();
  });

  it('should trigger scrollHandler on scroll event', () => {
    const scrollHandlerSpy = jest.spyOn(component, 'scrollHandler');
    const carouselContent = fixture.nativeElement.querySelector('.carousel-content');

    carouselContent.dispatchEvent(new Event('scroll'));

    expect(scrollHandlerSpy).toHaveBeenCalled();
  });
});
