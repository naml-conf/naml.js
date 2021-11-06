const parser = require('./parser/parser.js');
const serializer = require('./serializer/serializer.js');

/**
 * Returns a parsed version of the NAML passed in, or throws an exception if the input contains invalid NAML.
 * @param {string} naml The NAML to parse
 * @throws {InvalidNAMLException} The input must be valid NAML
 */
parse = (naml) => {
	return parser(naml);
};

/**
 * Returns a NAML string version of the object passed in.
 * @param {object} object The object to serialize
 */
serialize = (object) => {
	return serializer(object);
};

module.exports = {
	parse,
	serialize
};