import { TestBed } from '@angular/core/testing';
import { SpinnerPantallaCompletaComponent } from './spinner-pantalla-completa.component';
import { SpinnerPantallaCompletaService } from './spinner-pantalla-completa.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

describe('SpinnerOverlayService', () => {
  let service: SpinnerPantallaCompletaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OverlayModule]
    });
    service = TestBed.inject(SpinnerPantallaCompletaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show loading', () => {
    // @ts-ignore
    spyOn(service.overlayRef, 'attach').and.stub();
    service.show();
    // @ts-ignore
    expect(service.overlayRef.attach).toHaveBeenCalledWith(new ComponentPortal(SpinnerPantallaCompletaComponent));
  });

  it('should show loading', () => {
    // @ts-ignore
    spyOn(service.overlayRef, 'detach').and.stub();
    service.hide();
    // @ts-ignore
    expect(service.overlayRef.detach).toHaveBeenCalled();
  });
});
