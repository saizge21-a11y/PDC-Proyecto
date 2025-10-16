import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditData } from './add-edit-data';

describe('AddEditData', () => {
  let component: AddEditData;
  let fixture: ComponentFixture<AddEditData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
