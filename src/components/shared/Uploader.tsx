import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Typography from '@material-ui/core/Typography'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

const Uploader = (props: any) => {
  const [loading, setLoading] = useState(false)
  const [src, setSrc] = useState(props.url)
  const onDrop = useCallback(
    async (acceptedFiles) => {
      setLoading(true)
      const reader = new FileReader()
      reader.onload = (evt) => {
        //@ts-ignore
        setSrc(evt.target.result)
        setLoading(false)
      }

      if (!props.multiple) {
        reader.readAsDataURL(acceptedFiles[0])
        props.setFieldValue(props.name, acceptedFiles[0])
      }
    },
    [props],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      <Typography
        style={{
          color: 'rgba(255, 255, 255, 0.7)',
          lineHeight: 1,
          marginTop: '18px',
          marginBottom: '5px',
        }}
      >
        {props.label}
      </Typography>
      <div
        {...getRootProps()}
        style={{
          width: '100%',
          height: '200px',
          border: '1px dashed rgba(255, 255, 255, 0.23)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <input {...getInputProps()} />
        {src ? (
          <img
            src={src}
            alt={props.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: '50% 50%',
            }}
          />
        ) : (
          <>
            <CloudUploadIcon
              style={{ fontSize: '50px', color: 'rgba(255, 255, 255, 0.7)' }}
            />
            {
              <Typography
                style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: 1,
                  marginTop: '16px',
                }}
              >
                {isDragActive
                  ? 'Click to select file(s)'
                  : 'Drag and drop or click to select file(s)'}
              </Typography>
            }
          </>
        )}
      </div>
    </>
  )
}

export default Uploader
