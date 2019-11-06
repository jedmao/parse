import test from 'ava'

import { BlankLine, Comment, EditorConfigINI, Property, Section } from '..'

const noChildren = new EditorConfigINI({
	type: 'EditorConfigINI',
	version: '15.0.0',
	children: [],
})

test('parsing a number throws a TypeError', t => {
	// @ts-ignore
	t.throws(() => EditorConfigINI.parse(42), 'expected a string')
})

test('parsing undefined returns an instance w/o children', t => {
	// @ts-ignore
	t.deepEqual(EditorConfigINI.parse(), noChildren)
})

test('parsing an empty string returns an instance w/o children', t => {
	t.deepEqual(EditorConfigINI.parse(''), noChildren)
})

test('throws when given a child with { type: "Unsupported" }', t => {
	t.throws(
		() =>
			new EditorConfigINI({
				version: 'irrelevant',
				children: [{ type: 'Unsupported' } as any],
			}),
		'expected a Property, Section, Comment or BlankLine',
	)
})

test('parses a property', t => {
	t.snapshot(EditorConfigINI.parse('foo=bar').children[0])
})

test('supports spaces in keys', t => {
	const prop = EditorConfigINI.parse('spaces in keys=allowed')
		.children[0] as Property
	t.is(prop.name.value, 'spaces in keys')
})

test('parses a property with whitespace all over and in-between', t => {
	t.snapshot(EditorConfigINI.parse('\t\t   foo \t = \t bar  \t   \n')
		.children[0] as Property)
})

test('parses blank lines', t => {
	t.snapshot(EditorConfigINI.parse('\n').children[0] as BlankLine)
	t.snapshot(EditorConfigINI.parse('\r\n').children[0] as BlankLine)
})

test('parses comments', t => {
	t.snapshot(EditorConfigINI.parse('#').children[0] as Comment)
	t.snapshot(EditorConfigINI.parse(';').children[0] as Comment)
})

test('parses a section', t => {
	t.snapshot(EditorConfigINI.parse('[foo]').children[0] as Section)
})

test('leading whitespace on each line is ignored', t => {
	const ws = '\t  \t  '

	const blankLine = EditorConfigINI.parse(`${ws}\n`).children[0] as BlankLine
	t.is(blankLine.raws.before, ws)
	t.is(blankLine.newline, '\n')

	const prop = EditorConfigINI.parse(`${ws}foo=bar`).children[0] as Property
	t.is(prop.name.raws.before, ws)
	t.is(prop.name.value, 'foo')

	const comment = EditorConfigINI.parse(`${ws};foo`).children[0] as Comment
	t.is(comment.raws.before, ws)
	t.is(comment.indicator, ';')

	const section = EditorConfigINI.parse(`${ws}[foo]`).children[0] as Section
	t.is(section.header.raws.before, ws + '[')
	t.is(section.header.name, 'foo')
})
