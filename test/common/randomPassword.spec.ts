import randomPassword from '../../src/common/randomPassword';
import { expect } from '@jest/globals';

describe('Generate a password according the given length', () => {
  it('should return the password of length 10', () => {
    const request = 10;

    const result = randomPassword(request);

    expect(result).toHaveLength(10);
  });
});
