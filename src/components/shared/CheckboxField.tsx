import React from 'react'
import { useField } from 'formik'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

interface ICheckboxField {
    label: string
    name: string
    //checked: boolean
    value?: boolean
}

const CheckboxField: React.FC<ICheckboxField> = ({label, name, value}) => {
    const [field] = useField({name})
    return (
      <div style={{margin: '16px 8px'}}>
        {/* <label style={{display: 'inline-block', width: '100px'}}>{label}</label>
        <input {...field} type="checkbox" checked={checked}/>
        {meta.touched && meta.error ? (
          <div className='error'>{meta.error}</div>
        ) : null} */}
        <FormControlLabel
        control={
          <Checkbox
            checked={field.value}
            {...field}
            //value="checkedB"
            color="primary"
          />
        }
        labelPlacement="start"
        label="Cover"
        />
      </div>
    )
  }

export default CheckboxField
