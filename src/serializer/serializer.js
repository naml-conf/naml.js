const NAMLException = require('../exception/NAMLException.js');

const PADDING_CHARACTER = '  ';

const serialize = (object, depth = 0) => {
	var output = '';

	if (typeof object !== 'object') {
		throw new NAMLException('Object to serialize must be an object');
	}

	Object.keys(object).forEach((key) => {
		const value = object[key];
		const depthPrefix = PADDING_CHARACTER.repeat(depth);
		output += depthPrefix;
		switch (typeof value) {
			case 'boolean':
				output += `${key} = ${value ? 'y' : 'n'}`;
				break;
			case 'object':
				output += `${key} {\n`;
				output += serialize(value, depth + 1);
				output += `${depthPrefix}}`;
				break;
			case 'number':
				output += `${key} = ${value}`;
				break;
			case 'string':
			default:
				// Escape double quotes, but only if they haven't been escaped yet. Also escape newlines.
				output += `${key} = "${value.toString().replace(/\\([\s\S])|(")/g, '\\$1$2').replace(/\n/g, '\\n')}"`;
				break;
		}
		output += '\n';
	});

	// Remove final trailing newline.
	if (output.endsWith('\n') && depth === 0) {
		return output.slice(0, -1);
	}

	return output;
};

module.exports = serialize;
