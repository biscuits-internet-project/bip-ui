import React, { useMemo, useEffect, useContext } from 'react';
import { Helmet } from "react-helmet"
import { AppContext } from '../../context/AppProvider'
import PageHeading from '../shared/PageHeading';
import ShowForm from './ShowForm';

const AddShow: React.FC = () => {
  const { state, asyncActions } = useContext(AppContext)

  return (
    <>
      <Helmet>
        <title>Biscuits Internet Project - Add Show</title>
      </Helmet>
      <PageHeading text="Add Show" />

      <ShowForm show={undefined}></ShowForm>
    </>
  );
}

export default AddShow