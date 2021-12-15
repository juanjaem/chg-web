import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecipitacionesComponent } from './precipitaciones.component';

describe('PrecipitacionesComponent', () => {
  let component: PrecipitacionesComponent;
  let fixture: ComponentFixture<PrecipitacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrecipitacionesComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecipitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
