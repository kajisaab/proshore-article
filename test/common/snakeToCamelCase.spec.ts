import { expect } from '@jest/globals';
import snakeToCamel from '../../src/common/snakeToCamelCase';

describe('Converts the snake case to camel case', () => {
  it('should return the Camelcase key of object from snake case ', () => {
    const request: Record<string, object | string> = {
      camel_case: 'CamelCase value',
      value: {
        display_name: 'Laptop'
      }
    };

    const result = snakeToCamel(request);

    expect(result).toEqual({ camelCase: 'CamelCase value', value: { displayName: 'Laptop' } });
  });

  it('should return an error ', () => {
    const request = {
      camel_case1: 'Camel Case value'
    };

    const result = snakeToCamel(request);

    expect(result).toEqual({ camelCase1: 'Camel Case value' });
  });
});
