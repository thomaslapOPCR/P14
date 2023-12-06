Dropdown Component
Installation

bash

npm install my-awesome-dropdown

Usage

jsx

import React from 'react';
import Dropdown from 'my-awesome-dropdown';

const MyComponent = () => {
const handleDropdownChange = (value) => {
console.log('Selected value:', value);
};

    return (
        <Dropdown
            value="Option 1"
            onChange={handleDropdownChange}
            placeholder="Select an option"
            styleProps={{
                dropdownButtonStyle: {
                    // Custom styles for the dropdown button
                    // ...
                },
                arrowIconStyle: {
                    // Custom styles for the arrow icon
                    // ...
                },
                dropdownMenuStyle: {
                    // Custom styles for the dropdown menu
                    // ...
                },
            }}
        >
            <div data-value="Option 1">Option 1</div>
            <div data-value="Option 2">Option 2</div>
            <div data-value="Option 3">Option 3</div>
        </Dropdown>
    );
};

export default MyComponent;

Props

    value: The selected value in the dropdown.
    onChange: Callback function triggered on value change.
    placeholder: Placeholder text to display when no value is selected.
    disabled: Flag indicating if the dropdown is disabled (optional).
    ico: Custom icon to display next to the dropdown text (optional).
    styleProps: Custom styles for different elements (optional).

Customization

The styleProps prop allows you to customize the styles of various elements in the Dropdown.

    dropdownButtonStyle: Style for the dropdown button.
    arrowIconStyle: Style for the arrow icon.
    dropdownMenuStyle: Style for the dropdown menu.