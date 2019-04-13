import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import './form-question.css';

const Dropdown = ({ id, name, data }) => {
	const [value, setValue] = useState(data[0]);
	console.log(data);
	return (
		<div className="question-container">
			<Select
				required label={name}
				value={value}
				onChange={event => setValue(event.target.value)}
				inputProps={{ name }}
			>
				{
					data.map(d =>
						<MenuItem value={d}>
							{d}
						</MenuItem>
					)
				}
			</Select>
		</div>
	);
};

export default Dropdown;
