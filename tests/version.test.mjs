import { describe, expect, test } from 'vitest';
import {version} from './package.json';

describe('getVersion', () => {
  test('it returns semver version string', () => {
    expect(version).not.toBeNull();
    expect(version).toContain('.');
    expect(version).toContain('-');
  });

});