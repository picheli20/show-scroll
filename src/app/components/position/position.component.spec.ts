import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PositionComponent } from './position.component';

describe('PositionComponent', () => {
  let component: PositionComponent;
  let fixture: ComponentFixture<PositionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), PositionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PositionComponent);
    component = fixture.componentInstance;

    // Set required input
    fixture.componentRef.setInput('position', 1);

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept position input', () => {
    expect(component.position()).toBe(1);
  });
});
