import { EditorConfigINIAST } from './EditorConfigINI'
import { BlankLineAST } from './BlankLine'
import { CommentAST } from './Comment'
import { NewlineAST } from './Newline'
import { PropertyAST, PropertyNameAST, PropertyValueAST } from './Property'
import { SectionAST, SectionHeaderAST } from './Section'

export interface Token {
	readonly type:
		| 'BlankLine'
		| 'Comment'
		| 'EditorConfigINI'
		| 'Newline'
		| 'Property'
		| 'PropertyName'
		| 'PropertyValue'
		| 'Section'
		| 'SectionHeader'
	pretty(): string
	toAST():
		| BlankLineAST
		| CommentAST
		| EditorConfigINIAST
		| NewlineAST
		| PropertyAST
		| PropertyNameAST
		| PropertyValueAST
		| SectionAST
		| SectionHeaderAST
	toString(): string
}

export interface Raws {
	before: NonNullable<string>
	after: NonNullable<string>
}
