import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Editor } from 'slate-react'
import Lists from '@convertkit/slate-lists'
import { renderMark, renderBlock, rules } from './utils'
import Html from 'slate-html-serializer'
import Toolbar from './Toolbar'

//import fontList from './fontFamilyMark/fontList'

const plugins = [Lists()]

const serializer = new Html({ rules })

const useStyles = makeStyles((theme) => ({
  editor: {
    minHeight: '150px',
    padding: '1em',
    border: '1px solid #ccc',
    fontFamily: "Quicksand",
    display: 'block',
    borderRadius: '4px',
    '& ul': {
      paddingLeft: '32px',
      listStyleType: 'circle',
      listStylePosition: 'outside',
    }
  },
}))

const editorStyle = {
  //width: 'calc(100% -30px)',
  minHeight: '150px',
  padding: '1em',
  border: '1px solid #ccc',
  fontFamily: "Quicksand",
  display: 'block',
  borderRadius: '4px'
  //marginBottom: '16px',
}

const TextEditor = ({ onChange, value }) => {
  const [editorValue, setEditorValue] = useState(serializer.deserialize(value))
  const editor = useRef(null)
  const classes = useStyles()
  return (
    <>
      <Toolbar editor={editor} editorValue={editorValue} />
      <Editor
        onChange={({ value }) => {
          const string = serializer.serialize(value)
          setEditorValue(value)
          onChange(string)
        }}
        plugins={plugins}
        ref={editor}
        renderBlock={renderBlock}
        renderMark={renderMark}
        className={classes.editor}
        value={editorValue}
      />
    </>
  )
}

TextEditor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
}

export default TextEditor
