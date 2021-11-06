const naml = require('../src');

test('parsing a non-string should throw an exception', () => {
	expect(() => naml.parse({})).toThrow();
});

test('parsing null should throw an exception', () => {
	expect(() => naml.parse(null)).toThrow();
});

test('parsing undefined should throw an exception', () => {
	expect(() => naml.parse(undefined)).toThrow();
});

describe('parsing invalid naml should throw an exception', () => {
	test('missing closing block', () => {
		expect(() => naml.parse('block {')).toThrow();
	});

	test('missing opening block', () => {
		expect(() => naml.parse('}')).toThrow();
	});

	test('missing operation', () => {
		expect(() => naml.parse('line without operation')).toThrow();
	});

	test('invalid type', () => {
		expect(() => naml.parse('error = e')).toThrow();
	});
});

test('parsing an empty string', () => {
	expect(naml.parse('')).toEqual({});
});

test('parsing the format demo in the spec sheet', () => {
	expect(naml.parse(`stringExample = "string text"
block {
  double = 0.01
  nestedBlock {
    nestedInteger = 10581
    nestedBoolean = y
  }
}`)).toEqual({
		stringExample: 'string text',
		block: {
			double: 0.01,
			nestedBlock: {
				nestedInteger: 10581,
				nestedBoolean: true
			}
		}
	});
});
