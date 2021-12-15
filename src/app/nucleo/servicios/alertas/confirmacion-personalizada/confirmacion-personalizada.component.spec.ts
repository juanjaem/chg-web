import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmacionPersonalizadaComponent } from './confirmacion-personalizada.component';

describe('ConfirmacionPersonalizadaComponent', () => {
  let component: ConfirmacionPersonalizadaComponent;
  let fixture: ComponentFixture<ConfirmacionPersonalizadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmacionPersonalizadaComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionPersonalizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
