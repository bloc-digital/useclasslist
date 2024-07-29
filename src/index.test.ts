import { renderHook } from '@testing-library/react';

import useClassList from './useClassList';

describe('Hook should be able to produce valid lists', () => {
  it('Generate a list of classes as an array', () => {
    const { result } = renderHook(() => useClassList({ defaultClass: 'test-class' }));

    expect(JSON.stringify(result.current)).toBe(JSON.stringify(['test-class']));
  });

  it('Generate a list of classes as a string', () => {
    const { result } = renderHook(() => useClassList({ defaultClass: 'test-class', string: true }));

    expect(result.current).toBe('test-class');
  });
  it('Generate a list of classes as an array with a variant', () => {
    const { result } = renderHook(() => useClassList({ defaultClass: 'test-class', variant: 'variant' }));

    expect(JSON.stringify(result.current)).toBe(JSON.stringify(['test-class', 'test-class--variant']));
  });
  it('Generate a list of classes as a string with a variant', () => {
    const { result } = renderHook(() => useClassList({ defaultClass: 'test-class', variant: 'variant', string: true }));

    expect(result.current).toBe('test-class test-class--variant');
  });

  it('Generate a list of classes as an array with an extra className', () => {
    const { result } = renderHook(() => useClassList({ defaultClass: 'test-class', className: 'another-class' }));

    expect(JSON.stringify(result.current)).toBe(JSON.stringify(['test-class', 'another-class']));
  });
  it('Generate a list of classes as a string with an extra className', () => {
    const { result } = renderHook(() =>
      useClassList({ defaultClass: 'test-class', className: 'another-class', string: true }),
    );

    expect(result.current).toBe('test-class another-class');
  });

  it('Generate a list of classes as an array including maps', () => {
    const { result } = renderHook(() =>
      useClassList({ defaultClass: 'test-class', maps: { 'test-class': 'mapped-test-class' } }),
    );

    expect(JSON.stringify(result.current)).toBe(JSON.stringify(['test-class', 'mapped-test-class']));
  });

  it('Generate a list of classes as a string including maps', () => {
    const { result } = renderHook(() =>
      useClassList({ defaultClass: 'test-class', maps: { 'test-class': 'mapped-test-class' }, string: true }),
    );

    expect(result.current).toBe('test-class mapped-test-class');
  });
});
