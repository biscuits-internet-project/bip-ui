import React from 'react';

import Wrap from './Wrap';
import Setlist from './Setlist';

interface MyState {
	years: number[],
}

export default class Setlists extends React.Component<{}, MyState> {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	years: [ 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020 ]
	  };
	}

	handleChange = () => {
		alert('give me all your fucking money');
	}

	render() {
		let { years } = this.state;
		return (

			<>
				<h2>Setlists</h2>
				<select name="years" id="years" onChange={this.handleChange}>
					{years.map((year, key) => {
						return (

							<option value={year}>{year}</option>
						)
					})}
				</select>
				<Setlist />
			</>

		)
	}
}