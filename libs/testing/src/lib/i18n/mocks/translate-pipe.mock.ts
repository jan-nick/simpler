import { MockPipe, MockedPipe } from 'ng-mocks';
import { TranslatePipe } from '@ngx-translate/core';
import { Type } from '@angular/core';

export const TranslatePipeMock: Type<MockedPipe<TranslatePipe>> = MockPipe(
  TranslatePipe,
  (key, args) => key + JSON.stringify(args)
);
