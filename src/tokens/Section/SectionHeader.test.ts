import test from 'ava'

import { SectionHeader } from '..'

const instance = new SectionHeader({
	name: 'HEADER',
	newline: {
		value: '\n',
	},
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
