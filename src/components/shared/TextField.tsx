import React from 'react'
import { useField} from 'formik'

interface ITextField {
    label: string
    name: string
    type: string
    value?: string
}

const TextField: React.FC<ITextField> = ({label, name, type, value}) => {
    const [field, meta, /*helpers*/] = useField({name,value})
    return (
      <div style={{margin: '16px 8px'}}>
        <label style={{display: 'inline-block', width: '100px'}}>{label}</label>
        <input {...field} type={type}/>
        {meta.touched && meta.error ? (
          <div className='error'>{meta.error}</div>
        ) : null}
      </div>
    )
  }

export default TextField
