import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUserType2Component } from './home-user-type-2.component';

describe('HomeUserType2Component', () => {
  let component: HomeUserType2Component;
  let fixture: ComponentFixture<HomeUserType2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUserType2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUserType2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
