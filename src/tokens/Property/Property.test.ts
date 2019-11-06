import test from 'ava'

import { Property } from '..'

const instance = new Property({
	name: {
		value: 'NAME',
		raws: {
			before: 'BEFORE_NAME__',
			after: '__AFTER_NAME',
		},
	},
	value: {
		value: 'VALUE',
		raws: {
			before: 'BEFORE_VALUE__',
			after: '__AFTER_VALUE',
		},
	},
	newline: {
		value: '\n',
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
