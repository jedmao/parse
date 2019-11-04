import test from 'ava'

import EditorConfigAST, {
	BlankLine,
	Comment,
	Property,
	Section,
} from './EditorConfigAST'
import { parse } from '.'

const emptyAST: EditorConfigAST = {
	type: 'EditorConfig',
	version: '15.0.0',
	children: [],
}

test('parsing a number throws a TypeError', t => {
	// @ts-ignore
	t.throws(() => parse(42), 'expected a string')
})

test('parsing undefined returns empty AST', t => {
	// @ts-ignore
	t.deepEqual(parse(), emptyAST)
})

test('parsing an empty string returns empty AST', t => {
	t.deepEqual(parse(''), emptyAST)
})

test('parses a property', t => {
	t.snapshot(parse('foo=bar').children[0] as Property)
})

test('supports spaces in keys', t => {
	const prop = parse('spaces in keys=allowed').children[0] as Property
	t.is(prop.name.value, 'spaces in keys')
})

test('parses a property with whitespace all over and in-between', t => {
	t.snapshot(parse('\t\t   foo \t = \t bar  \t   \n').children[0] as Property)
})

test('parses blank lines', t => {
	t.snapshot(parse('\n').children[0] as BlankLine)
	t.snapshot(parse('\r\n').children[0] as BlankLine)
})

test('parses comments', t => {
	t.snapshot(parse('#').children[0] as Comment)
	t.snapshot(parse(';').children[0] as Comment)
})

test('parses a section', t => {
	t.snapshot(parse('[foo]').children[0] as Section)
})

test('leading whitespace on each line is ignored', t => {
	const ws = '\t  \t  '

	const blankLine = parse(`${ws}\n`).children[0] as BlankLine
	t.is(blankLine.raws.before, ws)
	t.is(blankLine.newline.value, '\n')

	const prop = parse(`${ws}foo=bar`).children[0] as Property
	t.is(prop.name.raws.before, ws)
	t.is(prop.name.value, 'foo')

	const comment = parse(`${ws};foo`).children[0] as Comment
	t.is(comment.raws.before, ws)
	t.is(comment.indicator, ';')

	const section = parse(`${ws}[foo]`).children[0] as Section
	t.is(section.header.raws.before, ws + '[')
	t.is(section.header.name, 'foo')
})
