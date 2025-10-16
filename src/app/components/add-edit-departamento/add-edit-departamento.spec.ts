import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDepartamento } from './add-edit-departamento';

describe('AddEditDepartamento', () => {
  let component: AddEditDepartamento;
  let fixture: ComponentFixture<AddEditDepartamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditDepartamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDepartamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
