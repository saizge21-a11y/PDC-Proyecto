import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTableDepartamento } from './list-table-departamento';

describe('ListTableDepartamento', () => {
  let component: ListTableDepartamento;
  let fixture: ComponentFixture<ListTableDepartamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTableDepartamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTableDepartamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
