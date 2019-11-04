import Node from './Node'

export default class Comment implements Node {
	public readonly type: 'Comment'

	public constructor(ast: Comment) {
		this.type = ast.type
	}

	public toString() {
		return ''
	}
}
