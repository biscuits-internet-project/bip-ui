import React from 'react'
import { useField} from 'formik'
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
interface ISelectField {
    label: string
    name: string
    value?: string
    options: ISelectOption[]
    onSelect?: (any:any)=> any
    submitCount?: number
}

export interface ISelectOption {
  label?: string
  value?: string
  selected?: boolean
  //[key:string]: any
}

const SelectField: React.FC<ISelectField> = ({label, name, value, options,submitCount = 0}) => {
    const [field,meta] = useField({name,value})
    const fieldError = !!meta.error && (submitCount > 0 || meta.touched)
    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
      setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);
    return (
      <>
        <FormControl variant="outlined" fullWidth margin="normal" error={fieldError}>
        <InputLabel ref={inputLabel} id="label">{label}</InputLabel>
        <Select
          error={fieldError}
          //helperText={fieldError && meta.error}
          value={value}
          variant="outlined"
          labelWidth={labelWidth}
          {...field}
        >
          {options.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
        </Select>
        {fieldError && <FormHelperText>{meta.error}</FormHelperText>}

        </FormControl>
      </>
    )
  }

export default SelectField
