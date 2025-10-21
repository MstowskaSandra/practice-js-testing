import randomNumber from './app';

test('draws 1 when min and max are 1', () => {
    expect(randomNumber(1, 1)).toBe(1);
});