const naml = require('../src');

test('serializing a non-object should throw an exception', () => {
	expect(() => naml.serialize('naml')).toThrow();
});

test('serializing an empty object should return an empty string', () => {
	expect(naml.serialize({})).toBe('');
});

test('serializing the format demo in the spec sheet', () => {
	expect(naml.serialize({
		stringExample: 'string text',
		block: {
			double: 0.01,
			nestedBlock: {
				nestedInteger: 10581,
				nestedBoolean: true
			}
		}
	})).toBe(`stringExample = "string text"
block {
  double = 0.01
  nestedBlock {
    nestedInteger = 10581
    nestedBoolean = y
  }
}`);
});
