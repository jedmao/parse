import { readFileSync } from 'fs'
import { join as pathJoin } from 'path'
import { generate } from 'pegjs'
import { SetOptional } from 'type-fest'

import {
	BlankLine,
	BlankLineAST,
	Comment,
	CommentAST,
	Token,
	Property,
	PropertyAST,
	Section,
	SectionAST
} from '..'

const constructors = {
	BlankLine,
	Comment,
	Property,
	Section,
}

const parser = generate(
	readFileSync(pathJoin(__dirname, '..', '..', 'grammar.pegjs')).toString(),
)

export interface EditorConfigINIAST {
	type: 'EditorConfigINI'
	version: string
	children: Array<PropertyAST | SectionAST | CommentAST | BlankLineAST>
}

export class EditorConfigINI implements Token {
	public readonly type = 'EditorConfigINI'
	public readonly version: NonNullable<string>
	public children: Array<Property | Section | Comment | BlankLine>

	public constructor(ast: SetOptional<EditorConfigINIAST, 'type'>) {
		this.version = ast.version
		this.children = ast.children.map(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			node => new constructors[node.type](node as any),
		)
	}

	/**
	 * Parses an [INI file](https://en.wikipedia.org/wiki/INI_file) into
	 * [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree).
	 * The file must conform with the
	 * [EditorConfig INI format specification](https://editorconfig-specification.readthedocs.io/en/latest/).
	 */
	public static parse(contents: string) {
		if (
			typeof contents === 'string' ||
			[null, undefined].includes(contents)
		) {
			return new EditorConfigINI(parser.parse(contents || ''))
		}

		throw new TypeError('expected a string')
	}

	public toString() {
		return this.children.map(node => node.toString()).join('')
	}

	public pretty() {
		const blankLine = this.children.find(node => node.type === 'BlankLine')
		const propsAndComments = this.children.filter(node =>
			['Property', 'Comment'].includes(node.type),
		)
		const sections = this.children.filter(node => node.type === 'Section')
		return prettyNodes(propsAndComments) + (blankLine?.pretty() ?? '\n') + prettyNodes(sections)

		function prettyNodes(nodes: Token[]) {
			return nodes.map(node => node.pretty()).join('')
		}
	}

	public toAST(): EditorConfigINIAST {
		return {
			type: this.type,
			version: this.version,
			children: this.children.map(token => token.toAST())
		}
	}
}
