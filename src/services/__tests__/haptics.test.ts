import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  triggerLightImpact,
  triggerMediumImpact,
  triggerSelectionChange,
  triggerSuccessNotification,
} from '../haptics';

describe('Haptics Service', () => {
  it('invokes triggers safely without throwing in node environment', () => {
    assert.doesNotThrow(() => {
      triggerLightImpact();
      triggerMediumImpact();
      triggerSuccessNotification();
      triggerSelectionChange();
    });
  });
});
