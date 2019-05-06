import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductKeyboard1Component } from './product-keyboard1.component';

describe('ProductKeyboard1Component', () => {
  let component: ProductKeyboard1Component;
  let fixture: ComponentFixture<ProductKeyboard1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductKeyboard1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductKeyboard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
