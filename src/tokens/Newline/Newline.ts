import { SetOptional } from 'type-fest'

import { Token } from '..'

export interface NewlineAST {
	type: 'Newline'
	value: '\n' | '\r\n'
}

export class Newline implements Token {
	public readonly type = 'Newline'
	public value: NewlineAST['value']

	public constructor(ast: SetOptional<NewlineAST, 'type'>) {
		this.value = ast.value
	}

	public toString() {
		return this.value
	}

	public pretty() {
		return this.value
	}

	public toAST(): NewlineAST {
		return {
			type: this.type,
			value: this.value,
		}
	}
}
