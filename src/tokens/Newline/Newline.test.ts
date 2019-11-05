import test from 'ava'

import { Newline } from '..'

const instance = new Newline({ value: '\n' })

test('instance snapshot', t => {
	t.snapshot(instance)
})

test('toString() snapshot', t => {
	t.snapshot(instance.toString())
})

test('pretty() snapshot', t => {
	t.snapshot(instance.pretty())
})
