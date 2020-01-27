import React from 'react'
import { useField } from 'formik'

interface ISelectField {
    label: string
    name: string
    value?: string
}

const SelectField: React.FC<ISelectField> = ({label, name, value}) => {
    const [field, meta, /*helpers*/] = useField({name,value})
    return (
      <div style={{margin: '16px 8px'}}>
        <label style={{display: 'inline-block', width: '100px'}}>{label}</label>
        <select {...field} name={name} value={value}>
        </select>
        {meta.touched && meta.error ? (
          <div className='error'>{meta.error}</div>
        ) : null}
      </div>
    )
  }

export default SelectField
