import React,{ReactEventHandler, ChangeEvent,KeyboardEvent, useState} from 'react'
import { useField} from 'formik'
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

interface IChipField {
    label: string
    name: string
    //value?: string[]
}

const ChipField: React.FC<IChipField> = ({label, name}) => {
  const [inputValue,setInputValue] = useState('')
  const [field, meta, helpers] = useField({name})
  //const fieldError = !!meta.error && meta.touched
  const handleChange:ReactEventHandler = (evt:ChangeEvent<HTMLInputElement>):void => {
    const {value} = evt.target
    setInputValue(value)
  }
  const handleKey = (evt:KeyboardEvent<HTMLElement>) => {
      if(evt.key ==='Enter'){
        helpers.setValue([...field.value, inputValue])
        setInputValue('')
      }
  }
  console.log('gdhgfjhds', field)
  return (
      <>
        <div style={{width: '100%', position: 'relative'}}><TextField type="text" label={label} value={inputValue} onChange={handleChange} onKeyPress={handleKey} fullWidth margin="dense"/></div>
        <div style={{position:'absolute', right: 10}}>
            {field.value.map((chip:string,index:number) => <Chip style={{height: '26px', marginTop:'4px', marginLeft: '4px'}} label={chip} color="primary" onDelete={()=>{}}/>)}
        </div>
    </>
  )
}

export default ChipField