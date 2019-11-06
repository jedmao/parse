import test from 'ava'

import { BlankLine } from '..'

const instance = new BlankLine({
	newline: {
		value: '\n' as '\n',
	},
	raws: {
		before: 'BEFORE__',
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
