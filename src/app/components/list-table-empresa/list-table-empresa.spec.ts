import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTableEmpresa } from './list-table-empresa';

describe('ListTableEmpresa', () => {
  let component: ListTableEmpresa;
  let fixture: ComponentFixture<ListTableEmpresa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTableEmpresa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTableEmpresa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
