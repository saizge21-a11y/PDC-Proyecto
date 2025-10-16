import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTableTrabajador } from './list-table-trabajador';

describe('ListTableTrabajador', () => {
  let component: ListTableTrabajador;
  let fixture: ComponentFixture<ListTableTrabajador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTableTrabajador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTableTrabajador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
