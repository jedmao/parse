import { Except } from 'type-fest'

import { Token, Raws } from '..'

export interface PropertyValueAST {
	type: 'PropertyValue'
	value: NonNullable<boolean | number | string>
	raws: Raws
}

export class PropertyValue implements Token {
	public readonly type = 'PropertyValue'
	public value: PropertyValueAST['value']
	public raws: Raws

	public constructor(ast: Except<PropertyValueAST, 'type'>) {
		this.value = ast.value
		this.raws = ast.raws
	}

	public toString() {
		return this.raws.before + this.value.toString() + this.raws.after
	}

	public pretty() {
		return this.value.toString()
	}
}
