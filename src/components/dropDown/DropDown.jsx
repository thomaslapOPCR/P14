import React, { useState } from 'react';
import './DropDown.scss';
import {ReactComponent as Arrow} from "./sort-down-solid.svg";
import {clsx} from "clsx";

const Dropdown = ({ value, onChange, placeholder, children, disabled, ico  }) => {
    const [isOpen, setIsOpen] = useState(false);


    const handleItemClick = (value) => {
        onChange(value);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className= "dropdown">
            <p
                className="dropdown-button"
                onClick={!disabled && toggleDropdown}
                type="button"
            >
                {value || placeholder}
                {ico || <Arrow className={clsx(isOpen && "rotate")}/>}
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