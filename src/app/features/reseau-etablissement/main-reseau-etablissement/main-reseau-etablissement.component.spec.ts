import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainReseauEtablissementComponent } from './main-reseau-etablissement.component';

describe('MainReseauEtablissementComponent', () => {
  let component: MainReseauEtablissementComponent;
  let fixture: ComponentFixture<MainReseauEtablissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainReseauEtablissementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainReseauEtablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});