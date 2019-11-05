import { Except } from 'type-fest'

import { Token } from '..'

export interface NewlineAST {
	type: 'Newline'
	value: '\n' | '\r\n'
}

export class Newline implements Token {
	public readonly type = 'Newline'
	public value: NewlineAST['value']

	public constructor(ast: Except<NewlineAST, 'type'>) {
		this.value = ast.value
	}

	public toString() {
		return this.value
	}

	public pretty() {
		return this.value
	}
}
