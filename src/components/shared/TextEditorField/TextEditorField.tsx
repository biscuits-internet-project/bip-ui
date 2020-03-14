import React from 'react'
import { useField} from 'formik'
import TextEditor from './TextEditor'
import Paragraph from '../Paragraph'

interface IRichTextField {
  label: string
  name: string
}

const TextEditorField:React.FC<IRichTextField> = ({ label, name }) => {
  const [field, meta, helpers] = useField({name})

  return ((
    <>
      <Paragraph>{label}</Paragraph>
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
