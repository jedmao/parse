import Node from './Node'

export default class Newline implements Node {
	public readonly type: 'Newline'
	public value: '\n' | '\r\n'

	public constructor(ast: Newline) {
		this.type = ast.type
		this.value = ast.value
	}

	public toString() {
		return this.value
	}
}
