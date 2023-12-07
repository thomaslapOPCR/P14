DatePicker Component
Installation

bash

npm install my-awesome-datepicker

Usage

jsx

import React from 'react';
import DatePicker from 'my-awesome-datepicker';

const MyComponent = () => {
const handleDateChange = (date) => {
console.log('Selected date:', date);
};

    return (
        <DatePicker
            value={new Date()}
            onChange={handleDateChange}
            params={{ subtractYears: 2, dateFormat: 'MM/DD/YYYY' }}
            styleProps={{
                inputStyle: {
                    // Custom styles for the input element
                    // ...
                },
                dropdownStyle: {
                    // Custom styles for the dropdown container
                    // ...
                },
                selectedDayStyle: {
                    // Custom styles for the selected day
                    // ...
                },
                dayStyle: {
                    // Custom styles for individual day elements
                    // ...
                },
            }}
        />
    );
};

export default MyComponent;

Props

    value: The selected date value (Date object or string).
    onChange: Callback function triggered on date change.
    params: Additional parameters for customization (optional).
    styleProps: Custom styles for different elements (optional).

Customization

The styleProps prop allows you to customize the styles of various elements in the DatePicker.

    inputStyle: Style for the input element.
    dropdownStyle: Style for the dropdown container.
    selectedDayStyle: Style for the selected day.
    dayStyle: Style for individual day elements.