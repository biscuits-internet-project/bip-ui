import React from 'react'
import { useField} from 'formik'

interface ITextField {
    label: string
    name: string
    type: string
}

const TextField: React.FC<ITextField> = ({label, name, type, ...props}) => {
    const [field, meta, /*helpers*/] = useField({name, type})
    return (
      <>
        <label>
          {label}
          <input {...field} {...props} />
        </label>
        {meta.touched && meta.error ? (
          <div className='error'>{meta.error}</div>
        ) : null}
      </>
    )
  }

export default TextField
