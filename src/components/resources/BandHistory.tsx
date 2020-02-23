import React from 'react';
import { Helmet } from "react-helmet";
import PageHeading from '../shared/PageHeading';

const BandHistory: React.FC = () => {
	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Band History</title>
			</Helmet>
			<PageHeading text="Band History"/>
		</>
	)
}
export default BandHistory
