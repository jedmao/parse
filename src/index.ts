export { default as BlankLine } from './nodes/BlankLine'
export { default as Comment } from './nodes/Comment'
export { default as EditorConfigAST } from './nodes/EditorConfigAST'
export { default as Node } from './nodes/Node'
export { default as Property } from './nodes/Property'
export { default as Section } from './nodes/Section'

import EditorConfigAST from './nodes/EditorConfigAST'

/**
 * Parses an [INI file](https://en.wikipedia.org/wiki/INI_file) into
 * [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree).
 * The file must conform with the
 * [EditorConfig INI format specification](https://editorconfig-specification.readthedocs.io/en/latest/).
 */
export const parse: typeof EditorConfigAST.parse = (contents: string) =>
	EditorConfigAST.parse(contents)
