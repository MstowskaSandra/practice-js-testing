import randomNumber from './app';

test('draws 1 when min and max are 1', () => {
    expect(randomNumber(1, 1)).toBe(1);
});

test('throw error if min or max are not numbers', () => {
    expect(() => randomNumber('a', 5)).toThrow('Arguments must be numbers');
    expect(() => randomNumber(1, null)).toThrow('Arguments must be numbers');
});

test('throw error if min is bigger then max', () => {
    expect(() => randomNumber(5, 3)).toThrow('Min should be less or equal to max');
});