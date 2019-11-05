export * from './tokens'

import { EditorConfigINI } from './tokens'

/**
 * Parses an [INI file](https://en.wikipedia.org/wiki/INI_file) into
 * [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree).
 * The file must conform with the
 * [EditorConfig INI format specification](https://editorconfig-specification.readthedocs.io/en/latest/).
 */
export const parse: typeof EditorConfigINI.parse = (contents: string) =>
	EditorConfigINI.parse(contents)
