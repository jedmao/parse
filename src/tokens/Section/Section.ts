import { SetOptional } from 'type-fest'

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

export interface SectionAST {
	type: 'Section'
	header: SetOptional<SectionHeaderAST, 'type'>
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

	public constructor(ast: SetOptional<SectionAST, 'type'>) {
		this.header = new SectionHeader(ast.header)
		this.children = ast.children.map(node => {
			switch (node.type) {
				case 'Property':
					return new Property(node)
				case 'Comment':
					return new Comment(node)
				case 'BlankLine':
					return new BlankLine(node)
				default:
					throw new TypeError('expected a Property, Comment or BlankLine')
			}
		})
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

	public toAST(): SectionAST {
		return {
			type: this.type,
			header: this.header.toAST(),
			children: this.children.map(node => node.toAST()),
		}
	}
}
