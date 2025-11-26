import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { SearchModalComponent } from '../search-modal/search-modal.component';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let modalControllerSpy: any;

  beforeEach(waitForAsync(() => {
    const spy = {
      create: jest.fn(),
      dismiss: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), HeaderComponent],
      providers: [
        { provide: ModalController, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    const ctrl = fixture.debugElement.injector.get(ModalController);
    jest.spyOn(ctrl, 'create').mockReturnValue(Promise.resolve({ present: jest.fn() } as any));
    modalControllerSpy = ctrl as any;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open search modal on Cmd+K', async () => {
    const modalSpy = { present: jest.fn() };
    modalControllerSpy.create.mockReturnValue(Promise.resolve(modalSpy));

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true
    });
    jest.spyOn(event, 'preventDefault');

    component.handleCmdK(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(modalControllerSpy.create).toHaveBeenCalledWith({
      component: SearchModalComponent,
      cssClass: 'spotlight-modal',
      backdropDismiss: true,
      showBackdrop: true,
    });

    // Wait for the async operation to complete
    await fixture.whenStable();
    expect(modalSpy.present).toHaveBeenCalled();
  });

  it('should open search modal on Ctrl+K', async () => {
    const modalSpy = { present: jest.fn() };
    modalControllerSpy.create.mockReturnValue(Promise.resolve(modalSpy));

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true
    });
    jest.spyOn(event, 'preventDefault');

    component.handleCmdK(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(modalControllerSpy.create).toHaveBeenCalled();

    await fixture.whenStable();
    expect(modalSpy.present).toHaveBeenCalled();
  });
});
