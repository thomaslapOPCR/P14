import React, { useState } from 'react';
import './DropDown.scss';

const Dropdown = ({ value, onChange, placeholder, children }) => {
    const [isOpen, setIsOpen] = useState(false);


    const handleItemClick = (value) => {
        onChange(value);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown">
            <p
                className="dropdown-button"
                onClick={toggleDropdown}
                type="button"
            >
                {value || placeholder}
            </p>
            {isOpen && (
                <div
                    className="dropdown-menu">
                    {React.Children.map(children, child =>
                        React.cloneElement(child, { onClick: () => handleItemClick(child.props['data-value']) })
                    )}
                </div>
            )}
        </div>
    );
};

export default Dropdown;