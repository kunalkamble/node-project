const lib = require('../lib');

describe('absolute', () => {
    it('should return a positive number when input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });

    it('should return a positive number when input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it('should return a zero when input is zero', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet("Kunal");
        expect(result).toMatch(/Kunal/);
    });
});