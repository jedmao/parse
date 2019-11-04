Document =
  children:(BlankLine / Comment / Property)*
  sections:Section* {
  return {
    type: 'EditorConfig',
    version: '15.0.0',
    children: children.concat(sections),
  }
}

_ 'whitespace' = [ \t]*

PropertyEnd = _ ';'? _
Boolean = 'true' / 'false'

BlankLine =
  before:_
  newline:Newline {
  return {
    type: 'BlankLine',
    newline,
    raws: {
      before: before.join(''),
    },
  }
}

Newline =
  value:('\n' / '\r\n') {
  return {
    type: 'Newline',
    value,
  }
}

Comment =
  before:_
  indicator:('#' / ';')
  value:[^\r\n]*
  newline:Newline? {
  return {
    type: 'Comment',
    indicator,
    value: value.join(''),
    newline: newline || '',
    raws: {
      before: before.join(''),
    },
  }
}

Property =
  name:PropertyName
  delimiter:'='?
  value:PropertyValue?
  newline:Newline? {
  return {
    type: 'Property',
    name,
    delimiter: delimiter || '',
    value: value || '',
    newline: newline || '',
  }
}

PropertyName =
  before:_
  value:Identifier
  after:_ {
  const pos = /\S *$/.exec(value).index + 1
  return {
    type: 'PropertyName',
    value: value.slice(0, pos),
    raws: {
      before: before.join(''),
      after: value.slice(pos) + after.join(''),
    },
  }
}

PropertyValue =
  before:_
  value:[^ \t\r\n]+
  after:PropertyEnd {
  var value = value.join('')
  try {
    value = JSON.parse(value.toLowerCase())
  } catch (err) {
    // noop
  }
  return {
    type: 'PropertyValue',
    value,
    raws: {
      before: before.join(''),
      after: after.map(x => Array.isArray(x) ? x.join('') : x).join(''),
    },
  }
}

Identifier = $([a-z_ ]i+)

Section =
  header:SectionHeader
  children:(Comment / Property / BlankLine)* {
  return {
    type: 'Section',
    header,
    children,
  }
}

SectionHeader =
  before:(_ '[')
  name:[^\]]+
  after:(']' _)
  newline:Newline? {
  return {
    type: 'SectionHeader',
    name: name.join(''),
    newline: newline || '',
    raws: {
      before: before.map(x => Array.isArray(x) ? x.join('') : x).join(''),
      after: after.map(x => Array.isArray(x) ? x.join('') : x).join(''),
    },
  }
}
