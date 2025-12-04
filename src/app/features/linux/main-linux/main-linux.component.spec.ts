import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLinuxComponent } from './main-linux.component';

describe('MainLinuxComponent', () => {
  let component: MainLinuxComponent;
  let fixture: ComponentFixture<MainLinuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLinuxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLinuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
