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
    <div style={{marginBottom: '16px'}}>
      <TextField id={label} type={type} label={label} {...field} fullWidth error={fieldError} helperText={fieldError && meta.error} margin="dense"/>
    </div>
  )
}

export default TextFieldContainer