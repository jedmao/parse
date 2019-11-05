import test from 'ava'

import { Section } from '..'

const instance = new Section({
	header: {
		name: 'HEADER',
		newline: {
			value: '\n',
		},
		raws: {
			before: 'BEFORE__',
			after: '__AFTER',
		},
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
