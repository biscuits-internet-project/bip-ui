import React, { useState, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputBase from '@material-ui/core/InputBase'
import fontList from './fontList'
import fontFamilyFormat from './fontFamilyFormat'

const StyledInput = withStyles(() => ({
  input: {
    padding: '10px 26px 10px 12px',
  },
}))(InputBase)

const FontFamilySelect = ({ editorValue, editor }) => {
  const [value, setValue] = useState(fontList[0].name)
  useEffect(() => {
    const mark = editorValue.activeMarks.find((mark) => mark.type === 'fontFamily')
    if (mark) {
      const fontName = mark.data.get('fontFamily')
      setValue(fontName)
    } else {
      setValue(fontList[0].name)
    }
  }, [editorValue])
  return (
    <Select
      input={<StyledInput />}
      onChange={({ target }) => {
        const {value} = target
        //@ts-ignore
        setValue(value.fontName)
        //@ts-ignore
        fontFamilyFormat({ editorValue, editor, fontName: value.fontName })
      }}
      renderValue={() => value}
      style={{ width: '90px' }}
      value={value}
    >
      {fontList.map((font) => (
        <MenuItem key={font.name} style={{ fontFamily: font.fontFamily }} value={font.name}>
          {font.name}
        </MenuItem>
      ))}
    </Select>
  )
}

FontFamilySelect.propTypes = {
  editor: PropTypes.object,
  editorValue: PropTypes.object,
}

export default memo(FontFamilySelect)
