import React from 'react'
import { useField} from 'formik'
import TextField from '@material-ui/core/TextField';
interface ITextAreaField {
    label: string
    name: string
    value?: string
    rows?: number
    columns?: number
}

const TextField2: React.FC<ITextAreaField> = ({label, name, value, rows, columns}) => {
    const [field, meta, /*helpers*/] = useField({name,value})
    return (
      <div>
        <TextField 
          id={label} 
          label={label} 
          {...field} 
          fullWidth
          multiline
          rowsMax="4"
        />
        {/* <label style={{display: 'inline-block', width: '100px'}}>{label}</label>
        <textarea {...field} rows={rows || 5} cols={columns || 50}>
          {value}
        </textarea> */}
        {meta.touched && meta.error ? (
          <div className='error'>{meta.error}</div>
        ) : null}
      </div>
    )
  }

export default TextField2
