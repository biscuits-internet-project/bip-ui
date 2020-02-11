import fontList from './fontList'

const hasMark = (editorvalue) => editorvalue.marks.some((mark) => mark.type === 'fontFamily')

const getMark = (editorValue) => {
  return editorValue.marks.filter((mark) => mark.type === 'fontFamily')
}

const fontFamilyFormat = ({ editorValue, fontName, editor }) => {
  const font = fontList.find((font) => font.name === fontName)
  if (hasMark(editorValue)) {
    const marks = getMark(editorValue)
    marks.forEach((mark) => editor.current.removeMark(mark))
    //@ts-ignore
    editor.current.addMark({ type: 'fontFamily', data: { fontFamily: font.fontFamily, fontName } }).focus()
  } else {
    //@ts-ignore
    editor.current.addMark({ type: 'fontFamily', data: { fontFamily: font.fontFamily , fontName } }).focus()
  }
}

export default fontFamilyFormat
