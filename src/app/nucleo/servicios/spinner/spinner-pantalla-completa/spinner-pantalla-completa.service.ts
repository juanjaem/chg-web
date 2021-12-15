import { SpinnerPantallaCompletaComponent } from './spinner-pantalla-completa.component';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerPantallaCompletaService {
  private overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay) {
    this.overlayRef = this.overlay.create();
  }

  public show() {
    // Returns an OverlayRef (which is a PortalHost)

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }
    // Create ComponentPortal that can be attached to a PortalHost
    const spinnerOverlayPortal = new ComponentPortal(SpinnerPantallaCompletaComponent);
    this.overlayRef.detach();
    this.overlayRef.attach(spinnerOverlayPortal); // Attach ComponentPortal to PortalHost
  }

  public hide() {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}
