import test from 'ava'

import { BlankLine } from '..'

const instance = new BlankLine({
	newline: {
		value: '\n',
	},
	raws: {
		before: 'BEFORE__',
	},
})

test('snapshot', t => {
	t.snapshot(instance)
})

test('toString() snapshot', t => {
	t.snapshot(instance.toString())
})

test('pretty() snapshot', t => {
	t.snapshot(instance.pretty())
})
