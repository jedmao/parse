import test from 'ava'

import { SectionHeader } from '..'

const instance = new SectionHeader({
	name: 'HEADER',
	newline: '\n',
	raws: {
		before: 'BEFORE__',
		after: '__AFTER',
	},
})

test('instance snapshot', t => {
	t.snapshot(instance)
})

test('toString() snapshot', t => {
	t.snapshot(instance.toString())
})

test('pretty() snapshot', t => {
	t.snapshot(instance.pretty())
})

test('toAST()', t => {
	t.snapshot(instance.toAST())
})
