import React, {
  ReactEventHandler,
  ChangeEvent,
  KeyboardEvent,
  useState,
} from 'react'
import { useField } from 'formik'
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip'
import { Paper, createStyles, makeStyles, Theme } from '@material-ui/core'

interface IChipField {
  label: string
  name: string
  //value?: string[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      padding: theme.spacing(0.5),
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  }),
)

const ChipField: React.FC<IChipField> = ({ label, name }) => {
  const classes = useStyles()
  const [inputValue, setInputValue] = useState('')
  const [field, , helpers] = useField({ name })
  //const fieldError = !!meta.error && meta.touched
  const handleChange: ReactEventHandler = (
    evt: ChangeEvent<HTMLInputElement>,
  ): void => {
    const { value } = evt.target
    setInputValue(value)
  }
  const handleKey = (evt: KeyboardEvent<HTMLElement>) => {
    if (evt.key === 'Enter') {
      evt.preventDefault()
      helpers.setValue([...field.value, inputValue])
      setInputValue('')
    }
  }
  const handleDelete = (chip: string) => {
    const newArray = field.value.filter((val: string) => chip !== val)
    helpers.setValue(newArray)
  }
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ width: '100%', position: 'relative' }}>
        <TextField
          type="text"
          variant="outlined"
          label={label}
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKey}
          fullWidth
          margin="dense"
        />
      </div>
      <div style={{ position: 'relative', right: 0, top: 0 }}>
        {field.value &&
          field.value.map((chip: string, index: number) => (
            <Chip
              key={index}
              className={classes.chip}
              label={chip}
              color="primary"
              onDelete={() => handleDelete(chip)}
            />
          ))}
      </div>
    </div>
  )
}

export default ChipField
