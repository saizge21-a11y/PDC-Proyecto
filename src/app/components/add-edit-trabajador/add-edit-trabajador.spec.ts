import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTrabajador } from './add-edit-trabajador';

describe('AddEditTrabajador', () => {
  let component: AddEditTrabajador;
  let fixture: ComponentFixture<AddEditTrabajador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditTrabajador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTrabajador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
