import { TestBed } from '@angular/core/testing';

import { ChatPageServiceService } from './chat-page-service.service';

describe('ChatPageServiceService', () => {
  let service: ChatPageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatPageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
