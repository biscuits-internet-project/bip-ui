import React, { useState, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputBase from '@material-ui/core/InputBase'
import sizeList from './sizeList'
import fontSizeFormat from './fontSizeFormat'

const StyledInput = withStyles(() => ({
  input: {
    padding: '10px 26px 10px 12px',
  },
}))(InputBase)

const FontSizeSelect = ({ editorValue, editor }) => {
  const [value, setValue] = useState('16')
  useEffect(() => {
    const mark = editorValue.activeMarks.find((mark) => mark.type === 'fontSize')
    if (mark) {
      const fontSize = mark.data.get('fontSize')
      setValue(fontSize)
    } else {
      setValue('16')
    }
  }, [editorValue])
  return (
    <Select
      input={<StyledInput />}
      onChange={({ target }) => {
        const {value} = target
        //@ts-ignore
        setValue(value.fontSize)
        //@ts-ignore
        fontSizeFormat({ editorValue, editor, fontSize: value.fontSize })
      }}
      renderValue={() => value}
      style={{ width: '60px' }}
      value={value}
    >
      {sizeList.map((size) => (
        <MenuItem key={size} value={size}>
          {size}
        </MenuItem>
      ))}
    </Select>
  )
}

FontSizeSelect.propTypes = {
  editor: PropTypes.object,
  editorValue: PropTypes.object,
}

export default memo(FontSizeSelect)
