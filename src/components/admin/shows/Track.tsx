import React from 'react'
import {FieldArrayRenderProps} from 'formik'
import SelectField from '../../shared/SelectField'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid';
import { AddCircle, Delete } from '@material-ui/icons';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {ISetlistForm, ISongOption,emptyTrack} from './AddShow'
import ChipField from '../../shared/ChipField'

interface ITrack {
    trackIndex: number
    values: ISetlistForm
    songOptions: ISongOption[]
    setFieldValue(field: string, value: any, shouldValidate?: boolean): void
    arrayHelpers: FieldArrayRenderProps
    submitCount?: number
}

const Track:React.FC<ITrack> = ({trackIndex,values, songOptions, setFieldValue,arrayHelpers, submitCount}) => {
    return (
        <Grid container spacing={4} alignItems="center" style={{marginBottom: '8px'}}>
            <Grid item xs={4}>
                <SelectField 
                    name={`sets[${values.activeSet}].tracks[${trackIndex}].song_id`} 
                    label="Song" 
                    options={songOptions}
                    submitCount={submitCount}
                    />
            </Grid>
            
            <Grid item xs={5} style={{position: 'relative'}}>
                <ChipField label="Annotations" name={`sets[${values.activeSet}].tracks[${trackIndex}].annotations`}/>
            </Grid>
            <Grid item xs={3}>
                <div style={{display: 'flex',justifyContent: 'space-between', padding: '0px 16px'}}>
                    <FormControlLabel
                    value="top"
                    control={
                        <Switch 
                            color="primary" 
                            checked={values.sets[values.activeSet].tracks[trackIndex].segue === '>'} 
                            onChange={(evt) => setFieldValue(`sets[${values.activeSet}].tracks[${trackIndex}].segue`, values.sets[values.activeSet].tracks[trackIndex].segue === '>' ? '' : '>')}
                        />
                    }
                    label="Segue?"
                    labelPlacement="start"
                    />
                    <div>
                        <IconButton color="primary" onClick={() => arrayHelpers.insert(trackIndex + 1, emptyTrack)}>
                            <AddCircle />
                        </IconButton>
                        <IconButton color="primary" disabled={values.sets[values.activeSet].tracks.length === 1} onClick={() => arrayHelpers.remove(trackIndex)}>
                            <Delete />
                        </IconButton> 
                    </div>
                </div>  
            </Grid>
        </Grid>
    )
}

export default Track