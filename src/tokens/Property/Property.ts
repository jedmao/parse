import {
	Newline,
	NewlineAST,
	Token,
	PropertyName,
	PropertyNameAST,
	PropertyValue,
	PropertyValueAST,
} from '..'

export interface PropertyAST {
	name: PropertyNameAST
	value: PropertyValueAST
	newline: NewlineAST
}

/**
 * The basic element contained in an INI file is the key or property.
 * Every property has a `name` and a `value`, delimited by an equals sign ( `=` ).
 * The `name` appears to the left of the equals sign.
 * @note In the Windows implementation the property cannot contain the characters
 * equals sign ( `=` ) or semi-colon ( `;` ) as these are reserved characters.
 * The `value` can contain any character.
 */
export class Property implements Token {
	public readonly type = 'Property'
	public name: PropertyName
	public value: PropertyValue
	public newline: Newline

	public constructor(ast: PropertyAST) {
		this.name = new PropertyName(ast.name)
		this.value = new PropertyValue(ast.value)
		this.newline = new Newline(ast.newline)
	}

	public toString() {
		return this.name + '=' + this.value + this.newline
	}

	public pretty() {
		return (
			this.name.pretty() +
			' = ' +
			this.value.pretty() +
			this.newline.pretty()
		)
	}
}
