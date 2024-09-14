import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUserType1Component } from './home-user-type-1.component';

describe('HomeUserType1Component', () => {
  let component: HomeUserType1Component;
  let fixture: ComponentFixture<HomeUserType1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUserType1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUserType1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
