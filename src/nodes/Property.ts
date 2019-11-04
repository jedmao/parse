import Node from './Node'
import Newline from './Newline'

/**
 * The basic element contained in an INI file is the key or property.
 * Every property has a `name` and a `value`, delimited by an equals sign ( `=` ).
 * The `name` appears to the left of the equals sign.
 * @note In the Windows implementation the property cannot contain the characters
 * equals sign ( `=` ) or semi-colon ( `;` ) as these are reserved characters.
 * The `value` can contain any character.
 */
export default class Property implements Node {
	public readonly type: 'Property'
	public name: PropertyName
	public value: PropertyValue
	public newline: Newline

	public constructor(ast: Property) {
		this.type = ast.type
		this.newline = ast.newline
	}

	public toString() {
		return ''
	}
}
