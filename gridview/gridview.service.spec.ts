import { TestBed, inject } from '@angular/core/testing';

import { GridviewService } from './gridview.service';

describe('GridviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GridviewService]
    });
  });

  it('should be created', inject([GridviewService], (service: GridviewService) => {
    expect(service).toBeTruthy();
  }));
});
