import React from 'react'
import { getIn, useField} from 'formik'
import TextEditor from './TextEditor'

interface IRichTextField {
  label: string
  name: string
}

const TextEditorField:React.FC<IRichTextField> = ({ label, name }) => {
  const [field, meta, helpers] = useField({name})
  console.log(field.value)
  return ((
    <div style={{position: 'relative', border: '1px solid #ccc', fontFamily: 'Quicksand',padding: '8px', borderRadius: '4px', marginTop: '0px'}}>
      <div style={{position: 'absolute', top: '-10px',fontSize: '0.75rem', background: 'white', display: 'inline-block', padding: '0px 8px' }}>{label}</div> 
      <TextEditor
        onChange={(value) => {
          helpers.setValue(value)
        }}
        value={field.value === null ? "" : field.value}
      />
    </div>
  ))
}

export default TextEditorField
