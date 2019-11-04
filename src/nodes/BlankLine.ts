import Node from './Node'
import Newline from './Newline'

export default class BlankLine implements Node {
	public readonly type: 'BlankLine'
	public newline: Newline
	public raws: {
		before: string
	}

	public constructor(ast: BlankLine) {
		this.type = ast.type
		this.newline = ast.newline
		this.raws = ast.raws
	}

	public toString() {
		return this.raws.before + this.newline.toString()
	}
}
