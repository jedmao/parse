import test from 'ava'

import { Comment } from '..'

const instance = new Comment({
	indicator: ';',
	value: 'VALUE',
	newline: {
		value: '\n',
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
