import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainChatbotComponent } from './main-chatbot.component';

describe('MainChatbotComponent', () => {
  let component: MainChatbotComponent;
  let fixture: ComponentFixture<MainChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainChatbotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
