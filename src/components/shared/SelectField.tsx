import React from 'react'
import { useField } from 'formik'

interface ISelectField {
    label: string
    name: string
    value?: string
    options: ISelectOption[]
}

export interface ISelectOption {
  label: string
  value?: string
  selected: boolean
}

const SelectField: React.FC<ISelectField> = ({label, name, value, options}) => {
    const [field, meta, /*helpers*/] = useField({name,value})
    return (
      <div style={{margin: '16px 8px'}}>
        <label style={{display: 'inline-block', width: '100px'}}>{label}</label>
        <select {...field} name={name} value={value}>
          <option value="none" selected disabled hidden> 
            Select One
          </option>
          {options.map((option) => <option key={option.value} label={option.label} value={option.value} selected={option.selected}></option>)}
        </select>
        {meta.touched && meta.error ? (
          <div className='error'>{meta.error}</div>
        ) : null}
      </div>
    )
  }

export default SelectField
