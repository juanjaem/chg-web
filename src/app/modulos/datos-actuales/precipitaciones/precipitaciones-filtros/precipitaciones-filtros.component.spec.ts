import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecipitacionesFiltrosComponent } from './precipitaciones-filtros.component';

describe('PrecipitacionesFiltrosComponent', () => {
  let component: PrecipitacionesFiltrosComponent;
  let fixture: ComponentFixture<PrecipitacionesFiltrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecipitacionesFiltrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecipitacionesFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
