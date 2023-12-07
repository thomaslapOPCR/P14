import React, { useState } from 'react';
import './DropDown.scss';
import { ReactComponent as Arrow } from "./sort-down-solid.svg";
import { clsx } from "clsx";

/**
 * Dropdown Component
 * @component
 * @param {Object} props - Component props
 * @param {string} props.value - The selected value in the dropdown.
 * @param {Function} props.onChange - Callback function triggered when the selected value changes.
 * @param {string} props.placeholder - Placeholder text to display when no value is selected.
 * @param {boolean} [props.disabled=false] - Flag indicating if the dropdown is disabled.
 * @param {ReactNode} props.children - The dropdown items as child components.
 * @param {ReactNode} [props.ico] - Custom icon to display next to the dropdown text.
 * @param {Object} [props.styleProps={}] - Custom styles for different elements.
 * @param {Object} [props.styleProps.dropdownButtonStyle={}] - Style for the dropdown button.
 * @param {Object} [props.styleProps.arrowIconStyle={}] - Style for the arrow icon.
 * @param {Object} [props.styleProps.dropdownMenuStyle={}] - Style for the dropdown menu.
 * @returns {JSX.Element} - Rendered Dropdown component.
 */
const Dropdown = ({ value, onChange, placeholder, children, disabled, ico, styleProps = {} }) => {
    const [isOpen, setIsOpen] = useState(false);

    /**
     * Handle click on a dropdown item.
     * @param {string} value - The value of the clicked item.
     */
    const handleItemClick = (value) => {
        onChange(value);
        setIsOpen(false);
    };

    /**
     * Toggle the visibility of the dropdown menu.
     */
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown">
            <p
                className="dropdown-button"
                onClick={!disabled && toggleDropdown}
                type="button"
                style={styleProps.dropdownButtonStyle}
            >
                {value || placeholder}
                {ico || <Arrow className={clsx(isOpen && "rotate")} style={styleProps.arrowIconStyle} />}
            </p>
            {isOpen && (
                <div
                    className="dropdown-menu"
                    style={styleProps.dropdownMenuStyle}
                >
                    {React.Children.map(children, child =>
                        React.cloneElement(child, { onClick: () => handleItemClick(child.props['data-value']) })
                    )}
                </div>
            )}
        </div>
    );
};

export default Dropdown;