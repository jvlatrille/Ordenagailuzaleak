import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAntiGafamComponent } from './main-anti-gafam.component';

describe('MainAntiGafamComponent', () => {
  let component: MainAntiGafamComponent;
  let fixture: ComponentFixture<MainAntiGafamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainAntiGafamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainAntiGafamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
