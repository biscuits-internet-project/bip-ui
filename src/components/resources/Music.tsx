import React from 'react';
import { Helmet } from "react-helmet";
import PageHeading from '../shared/PageHeading';

const Music: React.FC = () => {
	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Resources - Music</title>
			</Helmet>
			<PageHeading text="Music"/>
		</>
	)
}
export default Music
