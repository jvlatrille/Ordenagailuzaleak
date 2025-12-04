import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSportComponent } from './main-sport.component';

describe('MainSportComponent', () => {
  let component: MainSportComponent;
  let fixture: ComponentFixture<MainSportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
