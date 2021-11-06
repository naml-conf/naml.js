const NAMLException = require('./NAMLException.js');

class InvalidNAMLException extends NAMLException {
	constructor(reason) {
		super(reason);
	}
}

module.exports = InvalidNAMLException;