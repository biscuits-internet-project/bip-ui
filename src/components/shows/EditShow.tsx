import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Helmet } from "react-helmet"
import PageHeading from '../shared/PageHeading';
import ShowForm from './ShowForm';
import axios, { AxiosResponse } from 'axios';
import { IShow } from './Show';
import moment from 'moment';
import TrackForm from './TrackForm';

const EditShow: React.FC = () => {
  const params = useParams();
  const [show, setShow] = useState<IShow | undefined>(undefined)

  useEffect(()=> {
      const fetchShow = async () => {
        const data:AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shows/${params.id}`)
        const show:IShow = data.data
        show.date = new Date(moment(show.date).format("YYYY/MM/DD"))
        setShow(show)
      }
      fetchShow()
    },[params])

  return (
    <>
      <Helmet>
        <title>Biscuits Internet Project - Edit Show</title>
      </Helmet>
      <PageHeading text="Edit Show" />
      <ShowForm show={show}></ShowForm>

      <div style={{height: 20}}></div>

      {show && show.tracks.map((track) => {
          return (
            <TrackForm track={track}>
            </TrackForm>

          )
      })}

    </>
  );
}

export default EditShow