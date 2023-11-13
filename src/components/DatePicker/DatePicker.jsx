import React, {useState, useEffect} from 'react';
import './DatePicker.scss';

const DatePicker = ({ value, onChange, params = {} }) => {
    const current_year = new Date().getFullYear();
    const subtractYears = params.subtractYears || 0;
    const maximumYear  = current_year - subtractYears;
    const dateFormat = params.dateFormat || 'DD/MM/YYYY';
    const initialDate = value ? new Date(value) : new Date(new Date().setFullYear(maximumYear));
    const [selectedDate, setSelectedDate] = useState(initialDate);

    const formatDate = (date, format) => {
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();

        return format.replace('MM', month).replace('DD', day).replace('YYYY', year);
    };

    const formattedDefaultDate = formatDate(initialDate, dateFormat);
    const [inputValue, setInputValue] = useState(formattedDefaultDate);

    const [showDropdown, setShowDropdown] = useState(false);
    const [zIndex, setZIndex] = useState(1);

    let zIndexCounter = 1000;



    useEffect(() => {

        setInputValue(formatDate(selectedDate, dateFormat));
    }, [selectedDate,dateFormat]);



    const years = Array.from({ length: maximumYear - 1950 + 1 }, (_, i) => maximumYear - i);



    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
        const parts = inputValue.split('/');
        if (parts.length === 3) {
            const month = parseInt(parts[0], 10);
            const day = parseInt(parts[1], 10);
            const year = parseInt(parts[2], 10);
            const newDate = new Date(year, month - 1, day)
            if (!isNaN(newDate)) {
                setSelectedDate(newDate);
                onChange(formatDate(newDate, 'MM/DD/YYYY')); // Utilisez le format 'MM/DD/YYYY'
            }
        }
    };

    const handleDateClick = (day) => {
        const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
        setSelectedDate(newDate);
        onChange(formatDate(newDate, 'MM/DD/YYYY'));
        setShowDropdown(false);
    };

    const daysInMonth = (month, year) => {
        const currentDate = new Date();
        const lastDayInMonth = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: lastDayInMonth }, (_, i) => i + 1)
            .filter(day => {
                const currentDateInMonth = new Date(year, month, day);
                return currentDateInMonth <= currentDate;
            });
    };


    const toggleDropdown = () => {
        if (showDropdown) {
           zIndexCounter -= 1;
            setZIndex(1);
        } else {
            setZIndex(   zIndexCounter += 1);
        }


        setShowDropdown(!showDropdown);

    };


    return (
        <div className="date-picker" style={{ zIndex: zIndex }}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onClick={toggleDropdown}
            />
            {showDropdown && (
                <div className="dropdown-dp" >
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
                            <div key={day} className={`day ${day === selectedDate.getDate() ? 'selected' : ''}`} onClick={(e) => {
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