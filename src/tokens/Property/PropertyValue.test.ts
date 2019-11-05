import test from 'ava'

import { PropertyValue } from '..'

const instance = new PropertyValue({
	value: 'VALUE',
	raws: {
		before: 'BEFORE__',
		after: '__AFTER',
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
