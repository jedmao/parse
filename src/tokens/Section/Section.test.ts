import test from 'ava'

import { Section } from '..'

const instance = new Section({
	header: {
		name: 'HEADER',
		newline: '\n',
		raws: {
			before: 'BEFORE_HEADER__',
			after: '__AFTER_HEADER',
		},
	},
	children: [
		{
			type: 'Comment',
			indicator: ';',
			value: 'COMMENT',
			newline: '\n',
			raws: {
				before: 'BEFORE_COMMENT__',
			},
		},
		{
			type: 'BlankLine',
			newline: '\n',
			raws: {
				before: 'BEFORE_BLANK_LINE__',
			},
		},
		{
			type: 'Property',
			name: {
				value: 'foo',
				raws: {
					before: 'BEFORE_FOO__',
					after: '__AFTER_FOO',
				},
			},
			value: {
				value: 'bar',
				raws: {
					before: 'BEFORE_BAR__',
					after: '__AFTER_BAR',
				},
			},
			newline: '\n',
		},
	],
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
