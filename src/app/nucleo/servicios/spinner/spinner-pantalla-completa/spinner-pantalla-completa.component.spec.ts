import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerPantallaCompletaComponent } from './spinner-pantalla-completa.component';

describe('SpinnerPantallaCompletaComponent', () => {
  let component: SpinnerPantallaCompletaComponent;
  let fixture: ComponentFixture<SpinnerPantallaCompletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpinnerPantallaCompletaComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerPantallaCompletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
