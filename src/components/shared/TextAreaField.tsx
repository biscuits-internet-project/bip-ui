import React from 'react'
import { useField} from 'formik'
import TextField from '@material-ui/core/TextField';
interface ITextAreaField {
    label: string
    name: string
    value?: string
    rows?: number
    helperText?: string

}

const TextAreaField: React.FC<ITextAreaField> = ({label, name, value, rows, helperText}) => {
    const [field, meta, /*helpers*/] = useField({name,value})
    const fieldError = !!meta.error && meta.touched
    return (
        <TextField
          id={label}
          label={label}
          {...field}
          fullWidth
          helperText={helperText}
          variant="outlined"
          margin="normal"
          multiline={true}
          rows={rows || 5}
          error={fieldError}
        />
    )
  }

export default TextAreaField
