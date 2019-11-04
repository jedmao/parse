import { readFileSync } from 'fs'
import { join as pathJoin } from 'path'
import { generate } from 'pegjs'

import BlankLine from './BlankLine'
import Comment from './Comment'
import Property from './Property'
import Section from './Section'
import Node from './Node'

const constructors = {
	BlankLine,
	Comment,
	Property,
	Section,
}

const parser = generate(
	readFileSync(pathJoin(__dirname, 'grammar.pegjs')).toString(),
)

export default class EditorConfigAST implements Node {
	public readonly type: 'EditorConfigAST'
	public readonly version: NonNullable<string>
	public children: Array<Property | Section | Comment | BlankLine>

	public constructor(ast: EditorConfigAST) {
		this.type = ast.type
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
			return new EditorConfigAST(parser.parse(contents || ''))
		}

		throw new TypeError('expected a string')
	}

	public toString() {
		return this.children.map(node => node.toString()).join('')
	}
}
