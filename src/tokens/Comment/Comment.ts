import { SetOptional } from 'type-fest'

import { Newline, Token, Raws } from '..'

export interface CommentAST {
	type: 'Comment'
	indicator: '#' | ';'
	value: NonNullable<string>
	newline: Newline
	raws: Pick<Raws, 'before'>
}

export class Comment implements Token {
	public readonly type = 'Comment'
	public indicator: CommentAST['indicator']
	public value: CommentAST['value']
	public newline: Newline
	public raws: CommentAST['raws']

	public constructor(ast: SetOptional<CommentAST, 'type'>) {
		this.indicator = ast.indicator
		this.value = ast.value
		this.newline = ast.newline
		this.raws = ast.raws
	}

	public toString() {
		return this.raws.before + this.indicator + this.value + this.newline
	}

	public pretty() {
		return this.indicator + this.value + this.newline
	}

	public toAST(): CommentAST {
		return {
			type: this.type,
			indicator: this.indicator,
			value: this.value,
			newline: this.newline,
			raws: this.raws,
		}
	}
}
