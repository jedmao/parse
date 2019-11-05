import { Token, Raws } from '..'

export interface PropertyNameAST {
	value: NonNullable<string>
	raws: Raws
}

export class PropertyName implements Token {
	public readonly type = 'PropertyName'
	public value: PropertyNameAST['value']
	public raws: Raws

	public constructor(ast: PropertyNameAST) {
		this.value = ast.value
		this.raws = ast.raws
	}

	public toString() {
		return this.raws.before + this.value + this.raws.after
	}

	public pretty() {
		return this.value
	}
}
