export default function randomNumber(min, max) {
    if(typeof min !== 'number' || typeof max !== 'number') {
        throw new Error('Arguments must be numbers');
    }
    if (min > max) {
        throw new Error('Min should be less or equal to max');
    }
    if (min === max) return min;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}