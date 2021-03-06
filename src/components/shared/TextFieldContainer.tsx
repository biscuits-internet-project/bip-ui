import React from 'react'
import { useField} from 'formik'
import TextField from '@material-ui/core/TextField';

interface ITextField {
    label: string
    name: string
    type: string
    value?: string
}

const TextFieldContainer: React.FC<ITextField> = ({label, name, type, value}) => {
  const [field, meta, /*helpers*/] = useField({name,value})
  const fieldError = !!meta.error && meta.touched
  return (
    <TextField id={label} margin="normal" type={type} variant="outlined" label={label} {...field} fullWidth error={fieldError} helperText={fieldError && meta.error}/>
  )
}

export default TextFieldContainer