import Node from './Node'

export default class Section implements Node {
	public readonly type: 'Section'

	public constructor(ast: Section) {
		this.type = ast.type
	}

	public toString() {
		return ''
	}
}
