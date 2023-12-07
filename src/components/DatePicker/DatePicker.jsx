import React, {useState, useEffect} from 'react';
import './DatePicker.scss';
/**
 * DatePicker Component
 * @component
 * @param {Object} props - Component props
 * @param {Date|string} props.value - The selected date value in Date object or string format (e.g., '2023-11-22').
 * @param {Function} props.onChange - Callback function triggered when the selected date changes.
 * @param {Object} [props.params={}] - Additional parameters for customization.
 * @param {Object} [props.styleProps={}] - Custom styles for different elements.
 * @param {Object} [props.styleProps.inputStyle={}] - Style for the input element.
 * @param {Object} [props.styleProps.dropdownStyle={}] - Style for the dropdown container.
 * @param {Object} [props.styleProps.selectedDayStyle={}] - Style for the selected day.
 * @param {Object} [props.styleProps.dayStyle={}] - Style for individual day elements.
 * @returns {JSX.Element} - Rendered DatePicker component.
 */
const DatePicker = ({ value, onChange, params = {}, styleProps = {} }) => {
    // Get the current year for calculations
    const current_year = new Date().getFullYear();
    // Calculate the maximum year based on subtractYears param
    const subtractYears = params.subtractYears || 0;
    const maximumYear = current_year - subtractYears;
    // Define the date format for display
    const dateFormat = params.dateFormat || 'DD/MM/YYYY';
    // Set the initial date based on the provided value or maximumYear
    const initialDate = value ? new Date(value) : new Date(new Date().setFullYear(maximumYear));
    // State to manage the selected date
    const [selectedDate, setSelectedDate] = useState(initialDate);

    /**
     * Format the given date object into the specified format.
     * @param {Date} date - The date object to format.
     * @param {string} format - The desired date format.
     * @returns {string} - The formatted date string.
     */
    const formatDate = (date, format) => {
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();

        return format.replace('MM', month).replace('DD', day).replace('YYYY', year);
    };

    // Format the default date for input display
    const formattedDefaultDate = formatDate(initialDate, dateFormat);
    // State to manage the input value
    const [inputValue, setInputValue] = useState(formattedDefaultDate);

    // State to manage the visibility of the date dropdown
    const [showDropdown, setShowDropdown] = useState(false);
    // State to manage the z-index of the date dropdown
    const [zIndex, setZIndex] = useState(1);
    // Counter to track z-index changes
    let zIndexCounter = 1000;

    // Update input value when selected date changes or format changes
    useEffect(() => {
        setInputValue(formatDate(selectedDate, dateFormat));
    }, [selectedDate, dateFormat]);

    // Generate an array of years from 1950 to maximumYear
    const years = Array.from({ length: maximumYear - 1933 + 1 }, (_, i) => maximumYear - i);

    // Handle input change event
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Handle input blur event
    const handleInputBlur = () => {
        const parts = inputValue.split('/');
        if (parts.length === 3) {
            const month = parseInt(parts[0], 10);
            const day = parseInt(parts[1], 10);
            const year = parseInt(parts[2], 10);
            const newDate = new Date(year, month - 1, day)
            if (!isNaN(newDate)) {
                setSelectedDate(newDate);
                onChange(formatDate(newDate, 'MM/DD/YYYY')); // Use the 'MM/DD/YYYY' format
            }
        }
    };

    // Handle click on a date in the dropdown
    const handleDateClick = (day) => {
        const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
        setSelectedDate(newDate);
        onChange(formatDate(newDate, 'MM/DD/YYYY'));
        setShowDropdown(false);
    };

    /**
     * Get an array of valid days for the selected month and year.
     * @param {number} month - The selected month (0-based index).
     * @param {number} year - The selected year.
     * @returns {number[]} - Array of valid days.
     */
    const daysInMonth = (month, year) => {
        const currentDate = new Date();
        const lastDayInMonth = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: lastDayInMonth }, (_, i) => i + 1)
            .filter(day => {
                const currentDateInMonth = new Date(year, month, day);
                return currentDateInMonth <= currentDate;
            });
    };

    // Toggle the visibility of the date dropdown
    const toggleDropdown = () => {
        if (showDropdown) {
            zIndexCounter -= 1;
            setZIndex(1);
        } else {
            setZIndex(zIndexCounter += 1);
        }

        setShowDropdown(!showDropdown);
    };

    // Render the DatePicker component
    return (
        <div className="date-picker" style={{ zIndex: zIndex }}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onClick={toggleDropdown}
                style={styleProps.inputStyle}
            />
            {showDropdown && (
                <div className="dropdown-dp" style={styleProps.dropdownStyle}>
                    <div className="month-year-selector">
                        <select
                            value={selectedDate.getMonth()}
                            onChange={(e) => setSelectedDate(new Date(selectedDate.getFullYear(), parseInt(e.target.value, 10), selectedDate.getDate()))}
                        >
                            {Array.from({ length: 12 }, (_, i) => i).map((month) => (
                                <option key={month} value={month}>
                                    {new Date(0, month).toLocaleString('default', { month: 'long' })}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedDate.getFullYear()}
                            onChange={(e) => setSelectedDate(new Date(parseInt(e.target.value, 10), selectedDate.getMonth(), selectedDate.getDate()))}
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="days-grid">
                        {daysInMonth(selectedDate.getMonth(), selectedDate.getFullYear()).map((day) => (
                            <div key={day}
                                 style={styleProps.dayStyle}
                                 className={`day ${day === selectedDate.getDate() ? 'selected' : ''}`} onClick={(e) => {
                                e.preventDefault();
                                handleDateClick(day);
                                setShowDropdown(false);

                            }}>
                                {day}
                            </div>
                        ))}
                    </div>

                    {params.today ? <div className="buttonsContainer">
                        <button className="buttons" onClick={() => {
                            const today = new Date();
                            setSelectedDate(today);
                            setInputValue(formatDate(today, dateFormat));
                            setShowDropdown(false);
                        }}>Today
                        </button>
                    </div> : null}
                </div>
            )}
        </div>
    );
};

export default DatePicker;