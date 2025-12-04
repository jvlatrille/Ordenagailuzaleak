import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDemarcheComponent } from './main-demarche.component';

describe('MainDemarcheComponent', () => {
  let component: MainDemarcheComponent;
  let fixture: ComponentFixture<MainDemarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDemarcheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDemarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
