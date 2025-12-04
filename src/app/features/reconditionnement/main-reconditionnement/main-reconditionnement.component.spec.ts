import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainReconditionnementComponent } from './main-reconditionnement.component';

describe('MainReconditionnementComponent', () => {
  let component: MainReconditionnementComponent;
  let fixture: ComponentFixture<MainReconditionnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainReconditionnementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainReconditionnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
