import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecipitacionesTablaComponent } from './precipitaciones-tabla.component';

describe('PrecipitacionesTablaComponent', () => {
  let component: PrecipitacionesTablaComponent;
  let fixture: ComponentFixture<PrecipitacionesTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrecipitacionesTablaComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecipitacionesTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
