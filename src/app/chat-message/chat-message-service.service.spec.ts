import { TestBed } from '@angular/core/testing';

import { ChatMessageService } from './chat-message-service.service';

describe('ChatMessageServiceService', () => {
  let service: ChatMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
