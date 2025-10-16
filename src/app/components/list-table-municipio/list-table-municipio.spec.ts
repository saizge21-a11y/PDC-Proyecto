import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTableMunicipio } from './list-table-municipio';

describe('ListTableMunicipio', () => {
  let component: ListTableMunicipio;
  let fixture: ComponentFixture<ListTableMunicipio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTableMunicipio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTableMunicipio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
