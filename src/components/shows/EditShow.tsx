import React, { useMemo, useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Helmet } from "react-helmet"
import { AppContext } from '../../context/AppProvider'
import PageHeading from '../shared/PageHeading';
import ShowForm from './ShowForm';
import { IShow } from './Show';
import axios, { AxiosResponse } from 'axios'
import moment from 'moment';

const EditShow: React.FC = () => {
  const { state, asyncActions } = useContext(AppContext)
  const params = useParams();

  return (
    <>
      <Helmet>
        <title>Biscuits Internet Project - Edit Show</title>
      </Helmet>
      <PageHeading text="Edit Show" />
      <ShowForm id={params.id}></ShowForm>
    </>
  );
}

export default EditShow