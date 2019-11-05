import { Newline, NewlineAST, Token, Raws } from '..'

export interface BlankLineAST {
	newline: NewlineAST
	raws: Pick<Raws, 'before'>
}

export class BlankLine implements Token {
	public readonly type = 'BlankLine'
	public newline: Newline
	public raws: BlankLineAST['raws']

	public constructor(ast: BlankLineAST) {
		this.newline = new Newline(ast.newline)
		this.raws = ast.raws
	}

	public toString() {
		return this.raws.before + this.newline
	}

	public pretty() {
		return this.newline.pretty()
	}
}
