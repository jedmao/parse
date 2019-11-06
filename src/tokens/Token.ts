import { EditorConfigINIAST } from './EditorConfigINI'
import { BlankLineAST } from './BlankLine'
import { CommentAST } from './Comment'
import { PropertyAST, PropertyNameAST, PropertyValueAST } from './Property'
import { SectionAST, SectionHeaderAST } from './Section'

export interface Token {
	readonly type:
		| 'BlankLine'
		| 'Comment'
		| 'EditorConfigINI'
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

export type Newline = '\n' | '\r\n'
