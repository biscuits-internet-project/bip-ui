import React from 'react'
import { useField } from 'formik'
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
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
      <div>
        {/* <label style={{display: 'inline-block', width: '100px'}}>{label}</label>
        <select {...field} name={name} value={value}>
            <option value="none" selected disabled> 
              Select One
            </option>
          {options.map((option) => <option key={option.value} label={option.label} value={option.value}></option>)}
        </select>
        {meta.touched && meta.error ? (
          <div className='error'>{meta.error}</div>
        ) : null} */}
        <FormControl variant="outlined" fullWidth>
        <InputLabel id="label">{label}</InputLabel>
        <Select
          //fullWidth
          value={value}
          {...field}
          //variant="outlined"
        >
          {options.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
        </Select>

        </FormControl>
      </div>
    )
  }

export default SelectField
