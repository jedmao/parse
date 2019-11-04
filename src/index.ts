import { readFileSync } from 'fs'
import { join as pathJoin } from 'path'
import { generate } from 'pegjs'

import EditorConfigAST from './EditorConfigAST'

const parser = generate(
	readFileSync(pathJoin(__dirname, 'grammar.pegjs')).toString(),
)

/**
 * Parses an [INI file](https://en.wikipedia.org/wiki/INI_file) into
 * [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree).
 * The file must conform with the
 * [EditorConfig INI format specification](https://editorconfig-specification.readthedocs.io/en/latest/).
 */
export function parse(schema: string) {
	if (typeof schema === 'string' || [null, undefined].includes(schema)) {
		return parser.parse(schema || '') as EditorConfigAST
	}

	throw new TypeError('expected a string')
}
