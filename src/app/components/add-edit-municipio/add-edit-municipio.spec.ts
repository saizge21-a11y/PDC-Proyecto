import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMunicipio } from './add-edit-municipio';

describe('AddEditMunicipio', () => {
  let component: AddEditMunicipio;
  let fixture: ComponentFixture<AddEditMunicipio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditMunicipio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditMunicipio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
