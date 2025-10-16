import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEmpresa } from './add-edit-empresa';

describe('AddEditEmpresa', () => {
  let component: AddEditEmpresa;
  let fixture: ComponentFixture<AddEditEmpresa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditEmpresa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditEmpresa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
