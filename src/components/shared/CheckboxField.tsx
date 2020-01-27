import React from 'react'
import { useField } from 'formik'

interface ICheckboxField {
    label: string
    name: string
    checked: boolean
    value?: string
}

const CheckboxField: React.FC<ICheckboxField> = ({label, name, value, checked}) => {
    const [field, meta, /*helpers*/] = useField({name,value})
    return (
      <div style={{margin: '16px 8px'}}>
        <label style={{display: 'inline-block', width: '100px'}}>{label}</label>
        <input {...field} type="checkbox" checked={checked}/>
        {meta.touched && meta.error ? (
          <div className='error'>{meta.error}</div>
        ) : null}
      </div>
    )
  }

export default CheckboxField
