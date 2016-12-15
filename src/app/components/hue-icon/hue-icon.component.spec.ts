/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HueIconComponent } from './hue-icon.component';

describe('HueIconComponent', () => {
  let component: HueIconComponent;
  let fixture: ComponentFixture<HueIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HueIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HueIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
