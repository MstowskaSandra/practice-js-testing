export default function randomNumber(min, max) {
    if(typeof min !== 'number' || typeof max !== 'number') {
        throw new Error('Arguments must be numbers');
    }
    if (min === max) return min;
    return min;
}