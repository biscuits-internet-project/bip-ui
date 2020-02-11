const hasMark = (editorvalue) => editorvalue.marks.some((mark) => mark.type === 'fontSize')

const getMark = (editorValue) => {
  return editorValue.marks.filter((mark) => mark.type === 'fontSize')
}

const fontFamilyFormat = ({ editorValue, fontSize, editor }) => {
  if (hasMark(editorValue)) {
    const marks = getMark(editorValue)
    marks.forEach((mark) => editor.current.removeMark(mark))
    return editor.current.addMark({ type: 'fontSize', data: { fontSize } }).focus()
  } else {
    editor.current.addMark({ type: 'fontSize', data: { fontSize } }).focus()
  }
}

export default fontFamilyFormat
