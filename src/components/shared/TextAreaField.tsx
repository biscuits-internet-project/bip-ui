import React from 'react'
import { useField} from 'formik'
import TextField from '@material-ui/core/TextField';
interface ITextAreaField {
    label: string
    name: string
    value?: string
    rows?: number
}

const TextAreaField: React.FC<ITextAreaField> = ({label, name, value, rows}) => {
    const [field, meta, /*helpers*/] = useField({name,value})
    const fieldError = !!meta.error && meta.touched
    return (
        <TextField 
          id={label} 
          label={label} 
          {...field} 
          fullWidth
          multiline={true}
          rows={rows || 5}
          error={fieldError} helperText={fieldError && meta.error} 
        />
    )
  }

export default TextAreaField
