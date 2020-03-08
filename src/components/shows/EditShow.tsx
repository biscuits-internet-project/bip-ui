import React from 'react';
import { useParams } from 'react-router-dom'
import { Helmet } from "react-helmet"
import PageHeading from '../shared/PageHeading';
import ShowForm from './ShowForm';

const EditShow: React.FC = () => {
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