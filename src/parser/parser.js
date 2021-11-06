const NAMLException = require('../exception/NAMLException.js');
const InvalidNAMLException = require('../exception/InvalidNAMLException.js');

const parse = (naml) => {
	var output = {};

	if (typeof naml !== 'string') {
		throw new NAMLException('Object to deseralize must be a string');
	}

	var layer = {
		output
	};

	const lines = naml.split(/\r?\n/g);
	lines.forEach((line) => {
		// Skip empty lines.
		if (line.trim() === '') return;
		const components = line.split(/(?<!")(=|{)(?!")/g);
		const key = components[0].trim();

		const operation = components.length >= 2 ? components[1].trim() : components[0].trim();

		switch (operation) {
			case '=':
				const value = components[2].trim();
				var parsedValue;

				if (value === 'y' || value === 'n') parsedValue = value === 'y';
				else if (value.startsWith('"')) parsedValue = value.slice(1).slice(0, -1);
				else if (!isNaN(value)) parsedValue = parseFloat(value);
				else throw new InvalidNAMLException(`Invalid type for: ${key}`);

				if (layer.output[key]) {
					throw new InvalidNAMLException(`Duplicate key: ${key}`);
				}

				layer.output[key] = parsedValue;

				break;
			case '{':
				const newOutput = {};

				layer.output[key] = newOutput;
				layer = {
					output: newOutput,
					parent: layer
				};
				break;
			case '}':
				if (!layer.parent) {
					throw new InvalidNAMLException('Unexpected token: }');
				}
				layer = layer.parent;
				break;
			default:
				throw new InvalidNAMLException(`Unknown operation: ${operation}`);
		}
	});

	if (layer.parent) {
		throw new InvalidNAMLException('Unexpected end of data: a block is still unclosed');
	}

	return output;
}

module.exports = parse;