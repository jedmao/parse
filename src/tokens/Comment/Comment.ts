import { Newline, NewlineAST, Token, Raws } from '..'

export interface CommentAST {
	indicator: '#' | ';'
	value: NonNullable<string>
	newline: NewlineAST
	raws: Pick<Raws, 'before'>
}

export class Comment implements Token {
	public readonly type = 'Comment'
	public indicator: CommentAST['indicator']
	public value: CommentAST['value']
	public newline: Newline
	public raws: CommentAST['raws']

	public constructor(ast: CommentAST) {
		this.indicator = ast.indicator
		this.value = ast.value
		this.newline = new Newline(ast.newline)
		this.raws = ast.raws
	}

	public toString() {
		return this.raws.before + this.indicator + this.value + this.newline
	}

	public pretty() {
		return this.indicator + this.value + this.newline.pretty()
	}
}
