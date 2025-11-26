import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ShowThumbComponent } from './show-thumb.component';

describe('ShowThumbComponent', () => {
  let component: ShowThumbComponent;
  let fixture: ComponentFixture<ShowThumbComponent>;

  const mockShow = {
    id: 1,
    name: 'Test Show',
    image: { medium: 'test.jpg', original: 'test-orig.jpg' }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), ShowThumbComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowThumbComponent);
    component = fixture.componentInstance;

    // Set required input
    fixture.componentRef.setInput('show', mockShow);

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept show input', () => {
    expect(component.show()).toEqual(mockShow as any);
  });

  it('should default size to medium', () => {
    expect(component.size()).toBe('medium');
  });
});
