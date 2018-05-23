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

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();
        // Too generalway to test
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        // Too specific
        expect(result[0]).toBe('USD');
        expect(result[1]).toBe('CAD');
        expect(result[2]).toBe('EUR');
        // expect(result.length).toBe(3);

        // Proper way to test
        expect(result).toContain('USD');

        // Ideal test
        expect(result).toEqual(expect.arrayContaining(['USD', 'CAD', 'EUR']));
    });
});

describe('getProduct', () => {
    it('should return the product with the give id', () => {
        const result = lib.getProduct(1234);
        // toEqual is used to check object equality
        // It looks for exactly same object with same number of properties
        // This is too specific scenario
        expect(result).toEqual({ id: 1234, price: 10 });

        // It will look for only required properties
        expect(result).toMatchObject({ id: 1234, price: 10 });

        expect(result).toHaveProperty('id', 1234);
        expect(result).toHaveProperty('price', 10);
    });
});

describe('registerUser', () => {

    // Null, undefined, Nan, '', 0, false
    const args = [null, undefined, NaN, '', 0, false];
    args.forEach(a => {
        it(`should throw is username is ${a}`, () => {
            expect(() => { lib.registerUser(a) }).toThrow();
        });
    });

    it('should return user object when valid username is passed', () => {
        const result = lib.registerUser('kunalkamble');
        expect(result).toMatchObject({ username: 'kunalkamble' });
        expect(result.id).toBeGreaterThan(0);
    });
});

describe('fizzBuzz', () => {
    const args = [null, undefined, 'abc', {}, false];
    args.forEach(a => {
        it(`should throw if input is ${a}`, () => {
            expect(() => { lib.fizzBuzz(a) }).toThrow();
        });
    });

    it('should retun FizzBuzz if number is devisible by 3 & 5', () => {
        const result = lib.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });
    it('should retun Fizz if number is devisible by 3', () => {
        const result = lib.fizzBuzz(9);
        expect(result).toBe('Fizz');
    });
    it('should retun Fizz if number is devisible by 5', () => {
        const result = lib.fizzBuzz(10);
        expect(result).toBe('Buzz');
    });
    it('should retun input if number is not devisible by 3 or 5', () => {
        const result = lib.fizzBuzz(11);
        expect(result).toBe(11);
    });
});