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
    console.log(meta)
    return (
      <div style={{margin: '0px 8px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
        <label style={{display: 'inline-block', width: '100px', padding: '8px 0px'}}>{label}</label>
        <input {...field} type={type} style={{width: '200px', height: '30px'}}/>
        <div style={{color: 'red', padding: '8px 0px', height: '16px', opacity: meta.touched && meta.error ? 1 : 0 }}>{meta.error}</div>
      </div>
    )
  }

export default TextField