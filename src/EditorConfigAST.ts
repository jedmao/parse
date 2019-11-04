/**
 * [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) that conforms with the
 * [EditorConfig INI format specification](https://editorconfig-specification.readthedocs.io/en/latest/).
 * @version 15.0.0
 */
export default interface EditorConfigAST {
	type: 'EditorConfig'
	version: NonNullable<string>
	children: Array<Property | Section | Comment | BlankLine>
}

/**
 * The basic element contained in an INI file is the key or property.
 * Every property has a `name` and a `value`, delimited by an equals sign ( `=` ).
 * The `name` appears to the left of the equals sign.
 * @note In the Windows implementation the property cannot contain the characters
 * equals sign ( `=` ) or semi-colon ( `;` ) as these are reserved characters.
 * The `value` can contain any character.
 */
export interface Property {
	type: 'Property'
	name: PropertyName
	value: PropertyValue
	newline: Newline
}

export interface PropertyName {
	type: 'PropertyName'
	value: NonNullable<string>
	raws: Raws
}

export interface Raws {
	before: NonNullable<string>
	after: NonNullable<string>
}

export interface PropertyValue {
	type: 'PropertyValue'
	value: NonNullable<boolean | number | string>
	raws: Raws
}

/**
 * Properties may (but need not) be grouped into arbitrarily named _sections_.
 * The section name appears on a line by itself, in square brackets (`[` and `]`).
 * All properties after the section declaration are associated with that section.
 * There is no explicit "end of section" delimiter; sections end at the next
 * section declaration, or the end of the file. Sections may not be nested.
 * @note In the Windows implementation the section cannot contain a closing
 * square bracket ( `]` ).
 */
export interface Section {
	type: 'Section'
	header: SectionHeader
	children: Array<Comment | Property | BlankLine>
}

export interface SectionHeader {
	type: 'SectionHeader'
	name: NonNullable<string>
	newline: Newline
	raws: Raws
}

export interface Comment {
	type: 'Comment'
	indicator: '#' | ';'
	value: NonNullable<string>
	newline: Newline
	raws: Pick<Raws, 'before'>
}

export interface BlankLine {
	type: 'BlankLine'
	newline: Newline
	raws: Pick<Raws, 'before'>
}

export interface Newline {
	type: 'Newline'
	value: '\n' | '\r\n'
}
