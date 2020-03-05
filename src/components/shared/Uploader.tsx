import React, {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const Uploader = (props: any) => {
  const [loading, setLoading] = useState(false)
  const [src, setSrc] = useState("")
  const onDrop = useCallback(async acceptedFiles => {
    setLoading(true)
    const reader = new FileReader();
    reader.onload = (evt) => {
      //@ts-ignore
      setSrc(evt.target.result)
      setLoading(false)
    };
    reader.readAsDataURL(acceptedFiles[0]);
    props.setFieldValue('avatar', acceptedFiles[0])
  }, [props])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <>
      <Typography style={{color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1, marginTop: '16px'}}>Upload</Typography>
      <div {...getRootProps()} style={{width: '100%', height: '300px', border: "1px dashed rgba(255, 255, 255, 0.23)", display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <input {...getInputProps()} />
        {src ? <img src={src} alt="avatar" style={{width: '100%', height: '100%', objectFit: 'contain', objectPosition: '50% 50%'}}/> : (
          <>
          <CloudUploadIcon style={{fontSize: '50px', color: 'rgba(255, 255, 255, 0.7)'}}/>
            {
              isDragActive ?
                <Typography style={{color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1, marginTop: '16px'}}>Drop the files here ...</Typography> :
                <Typography style={{color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1, marginTop: '16px'}}>Drag 'n' drop some files here, or click to select files</Typography>
            }
          </>
        )}
      </div>
    </>
  )
}

export default Uploader