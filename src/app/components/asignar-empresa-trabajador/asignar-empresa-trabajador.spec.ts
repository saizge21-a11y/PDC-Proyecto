import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarEmpresaTrabajador } from './asignar-empresa-trabajador';

describe('AsignarEmpresaTrabajador', () => {
  let component: AsignarEmpresaTrabajador;
  let fixture: ComponentFixture<AsignarEmpresaTrabajador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarEmpresaTrabajador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarEmpresaTrabajador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
