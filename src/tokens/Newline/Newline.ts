import { Token } from '..'

export interface NewlineAST {
	value: '\n' | '\r\n'
}

export class Newline implements Token {
	public readonly type = 'Newline'
	public value: NewlineAST['value']

	public constructor(ast: NewlineAST) {
		this.value = ast.value
	}

	public toString() {
		return this.value
	}

	public pretty() {
		return this.value
	}
}
