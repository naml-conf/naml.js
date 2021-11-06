const InvalidNAMLException = require('./InvalidNAMLException.js');

class DuplicateKeyException extends InvalidNAMLException {
	constructor(reason) {
		super(reason);
	}
}

module.exports = DuplicateKeyException;
