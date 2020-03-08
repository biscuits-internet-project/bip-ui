import React from 'react'
import { useField} from 'formik'
import TextEditor from './TextEditor'
import { Typography } from '@material-ui/core'

interface IRichTextField {
  label: string
  name: string
}

const TextEditorField:React.FC<IRichTextField> = ({ label, name }) => {
  const [field, meta, helpers] = useField({name})

  return ((
    <>
      <Typography variant="body2">{label}</Typography>
      <div style={{position: 'relative', border: '1px solid #ccc', fontFamily: 'Quicksand',padding: '8px', borderRadius: '4px', marginTop: 15}}>
        <TextEditor
          onChange={(value) => {
            helpers.setValue(value)
          }}
          value={field.value === null ? "" : field.value}
        />
      </div>
    </>
  ))
}

export default TextEditorField
