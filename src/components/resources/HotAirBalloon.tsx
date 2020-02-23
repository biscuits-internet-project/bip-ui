import React from 'react';
import { Helmet } from "react-helmet";
import PageHeading from '../shared/PageHeading';

const HotAirBalloon: React.FC = () => {
	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Hot Air Balloon</title>
			</Helmet>
			<PageHeading text="Hot Air Balloon"/>
		</>
	)
}
export default HotAirBalloon
