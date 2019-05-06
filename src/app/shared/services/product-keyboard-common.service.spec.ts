import { TestBed } from '@angular/core/testing';

import { ProductKeyboardCommonService } from './product-keyboard-common.service';

describe('ProductKeyboardCommonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductKeyboardCommonService = TestBed.get(ProductKeyboardCommonService);
    expect(service).toBeTruthy();
  });
});
