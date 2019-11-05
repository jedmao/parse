import {
	BlankLine,
	BlankLineAST,
	Comment,
	CommentAST,
	Property,
	PropertyAST,
	SectionHeader,
	SectionHeaderAST,
	Token,
} from '..'

const constructors = {
	BlankLine,
	Comment,
	Property,
}

export interface SectionAST {
	header: SectionHeaderAST
	children: Array<CommentAST | PropertyAST | BlankLineAST>
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
export class Section implements Token {
	public readonly type = 'Section'
	public header: SectionHeader
	public children: Array<Comment | Property | BlankLine>

	public constructor(ast: SectionAST) {
		this.header = new SectionHeader(ast.header)
		this.children = ast.children.map(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			node => new constructors[node.type](node as any),
		)
	}

	public toString() {
		return this.header + this.children.map(node => node.toString()).join('')
	}

	public pretty() {
		return (
			this.header.pretty() +
			this.children
				.filter(node => node.type !== 'BlankLine')
				.map(node => node.pretty())
				.join('')
		)
	}
}
