import React from 'react'
import { useField} from 'formik'
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
interface ISelectField {
    label: string
    name: string
    value?: string
    options: ISelectOption[]
    onSelect?: (any:any)=> any
}

export interface ISelectOption {
  label?: string
  value?: string
  selected?: boolean
  //[key:string]: any
}

const SelectField: React.FC<ISelectField> = ({label, name, value, options, onSelect}) => {
    const [field, ,helpers] = useField({name,value})
    return (
      <div>
        <FormControl variant="outlined" fullWidth margin="dense">
        <InputLabel id="label">{label}</InputLabel>
        <Select
          value={value}
          {...field}
          onChange={(evt)=>{
            helpers.setValue(evt.target.value)
            onSelect && onSelect(evt.target.value)
          }}
          variant="outlined"
        >
          {options.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
        </Select>

        </FormControl>
      </div>
    )
  }

export default SelectField
