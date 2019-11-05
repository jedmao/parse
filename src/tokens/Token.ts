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
	toString(): string
}

export interface Raws {
	before: NonNullable<string>
	after: NonNullable<string>
}
