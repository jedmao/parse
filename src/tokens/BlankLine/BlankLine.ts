import { SetOptional } from 'type-fest'

import { Newline, NewlineAST, Token, Raws } from '..'

export interface BlankLineAST {
	type: 'BlankLine'
	newline: SetOptional<NewlineAST, 'type'>
	raws: Pick<Raws, 'before'>
}

export class BlankLine implements Token {
	public readonly type = 'BlankLine'
	public newline: Newline
	public raws: BlankLineAST['raws']

	public constructor(ast: SetOptional<BlankLineAST, 'type'>) {
		this.newline = new Newline(ast.newline)
		this.raws = ast.raws
	}

	public toString() {
		return this.raws.before + this.newline
	}

	public pretty() {
		return this.newline.pretty()
	}

	public toAST(): BlankLineAST {
		return {
			type: this.type,
			newline: this.newline.toAST(),
			raws: this.raws,
		}
	}
}
