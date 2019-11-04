export default interface Node {
	readonly type:
		| 'BlankLine'
		| 'Comment'
		| 'EditorConfigAST'
		| 'Newline'
		| 'Property'
		| 'Section'
	toString(): string
}
