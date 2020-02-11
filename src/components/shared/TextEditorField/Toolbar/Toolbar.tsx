import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft'
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter'
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight'
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify'
import FormatBoldIcon from '@material-ui/icons/FormatBold'
import FormatItalicIcon from '@material-ui/icons/FormatItalic'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
//import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease'
import FormatIndentDecreaseIcon from '@material-ui/icons/FormatIndentDecrease'
import Undo from '@material-ui/icons/Undo'
import Redo from '@material-ui/icons/Redo'
import Divider from '@material-ui/core/Divider'
//import FontFamilySelect from './../fontFamilyMark/FontFamilySelect'
//import FontSizeSelect from './../fontSizeMark/FontSizeSelect'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  divider: {
    alignSelf: 'stretch',
    height: 'auto',
    margin: theme.spacing(1, 0.5),
  },
}))

export const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    padding: theme.spacing(0, 1.5),
  },
}))(ToggleButtonGroup)

const Toolbar = ({ editor, editorValue }) => {
  const classes = useStyles()

  const hasMark = (type) => {
    return editorValue.activeMarks.some((mark) => mark.type === type)
  }

  const onClickMark = (event, type) => {
    event.preventDefault()
    editor.current.toggleMark(type)
  }

  const onClickBlock = (event, type) => {
    event.preventDefault()
    editor.current.setBlocks(type).focus()
  }

  const onIndent = ({ editorValue, editor, type }) => {
    const hasIndent = editorValue.blocks.some((node) => node.type === 'indent')
    if (hasIndent) {
      const block = editorValue.blocks.filter((mark) => mark.type === 'indent').first()
      const level =
        type === 'increase' ? block.data.get('level') + 1 : Math.max(block.data.get('level') - 1, 0)
      return editor.current.setBlocks({ type: 'indent', data: { level } })
    }
    const level = type === 'increase' ? 1 : 0
    return editor.current.setBlocks({ type: 'indent', data: { level } })
  }

  const toggleUnorderedList = (event) => {
    event.preventDefault()
    editor.current.toggleList()
  }

  // const toggleOrderedList = (event) => {
  //   event.preventDefault()
  //   editor.currenttoggleList({ type: 'ordered-list' })
  // }

  return (
    <Paper elevation={0} className={classes.paper}>
      <StyledToggleButtonGroup size="small">
        <ToggleButton
          onMouseDown={(event) => onClickMark(event, 'bold')}
          selected={hasMark('bold')}
          value="bold"
        >
          <FormatBoldIcon />
        </ToggleButton>
        <ToggleButton 
          onMouseDown={(event) => onClickMark(event, 'italic')}
          selected={hasMark('italic')}
          value="italic"
        >
          <FormatItalicIcon />
        </ToggleButton>
        <ToggleButton
          onMouseDown={(event) => onClickMark(event, 'underline')}
          selected={hasMark('underline')}
          value="underline"
        >
          <FormatUnderlinedIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>
      <Divider className={classes.divider} orientation="vertical" />
      <StyledToggleButtonGroup size="small">
        <ToggleButton onMouseDown={(event) => onClickBlock(event, 'leftAlign')} value="leftAlign">
          <FormatAlignLeftIcon />
        </ToggleButton>
        <ToggleButton
          onMouseDown={(event) => onClickBlock(event, 'centerAlign')}
          value="centerAlign"
        >
          <FormatAlignCenterIcon />
        </ToggleButton>
        <ToggleButton onMouseDown={(event) => onClickBlock(event, 'rightAlign')} value="rightAlign">
          <FormatAlignRightIcon />
        </ToggleButton>
        <ToggleButton onMouseDown={(event) => onClickBlock(event, 'justify')} value="justify">
          <FormatAlignJustifyIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>
      <Divider className={classes.divider} orientation="vertical" />
      <StyledToggleButtonGroup size="small">
        <ToggleButton onMouseDown={toggleUnorderedList} value="unordered">
          <FormatListBulletedIcon />
        </ToggleButton>
        {/* <ToggleButton onMouseDown={toggleOrderedList} value="ordered">
          <FormatListNumberedIcon />
        </ToggleButton> */}
        <ToggleButton
          onMouseDown={() => onIndent({ editorValue, editor, type: 'increase' })}
          value="indent"
        >
          <FormatIndentIncreaseIcon />
        </ToggleButton>
        <ToggleButton
          onMouseDown={() => onIndent({ editorValue, editor, type: 'decrease' })}
          value="outdent"
        >
          <FormatIndentDecreaseIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>
      <Divider className={classes.divider} orientation="vertical" />
      <StyledToggleButtonGroup size="small">
        <ToggleButton onMouseDown={() => editor.current.undo()} value="undo">
          <Undo />
        </ToggleButton>
        <ToggleButton onMouseDown={() => editor.current.redo()} value="redo">
          <Redo />
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Paper>
  )
}

Toolbar.propTypes = {
  editor: PropTypes.object,
  editorValue: PropTypes.object,
}

export default Toolbar
