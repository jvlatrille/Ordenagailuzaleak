import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCarteTalentsComponent } from './main-carte-talents.component';

describe('MainCarteTalentsComponent', () => {
  let component: MainCarteTalentsComponent;
  let fixture: ComponentFixture<MainCarteTalentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCarteTalentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCarteTalentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
