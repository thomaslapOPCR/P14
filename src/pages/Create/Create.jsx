import React, {useState} from 'react';
import styles from './Create.module.scss';
import * as yup from 'yup';
import data from '../../data/data.json';
import {Link} from "react-router-dom";
import moment from "moment";


import {Modal} from 'tl-opcr-modal-component-library';

import Dropdown from '../../components/dropDown/DropDown.jsx';
import DatePicker from '../../components/DatePicker/DatePicker.jsx';

// import Modal from '../../components/Modal/Modal.jsx';
const Create = () => {
    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
    const formattedBirthDate = new Date('11/14/2005').toLocaleString('en-US', options);
    const formattedDate = new Date().toLocaleString('en-US', options);

    const [errors, setErrors] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isAncienEmployee, setIsAncienEmployee] = useState(false);

    const handleClose = () => setIsModalVisible(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        states: "" || "Alabama",
        birthDate: formattedBirthDate,
        departureDate: formattedDate,
        department: "" || "Sales",
        address: "",
        postalCode: "",
        city: "",
    });

    function formatDate(date) {
        const d = new Date(date);
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const year = d.getFullYear();
        return new Date(year, month - 1, day);
    }


    const onlyString = "Only alphabets are allowed for this field";
    const stringRegex = /^[aA-zZ\s]+$/;



    const validationSchema = yup.object().shape({
        firstName: yup.string()
            .matches(stringRegex, onlyString)
            .required('First Name is required'),
        lastName: yup.string()
            .matches(stringRegex, onlyString)
            .required('Last Name is required'),
        states: yup.string()
            .matches(stringRegex, onlyString)
            .required('State is required'),
        birthDate: yup.date()
            .transform((originalValue) => {
                return originalValue ? formatDate(originalValue) : originalValue;
            })
            .required('Date of Birth is required')
            .test('age', 'You must be between 18 and 90 years old', function (value) {
                if (!value) {
                    return false;
                }

                const age = moment().diff(value, 'years');
                return isAncienEmployee ? age >= 18 && age < 90 : true;
            })
            .test('valid-date', 'Invalid date. The year should be between 1950 and the current year.', function (value) {
                if (!value) {
                    return false;
                }


                const currentDate = moment();
                const isFuture = moment(value).isAfter(currentDate);
                const isBefore1950 = moment(value).isBefore('1990-01-01');

                return !isFuture && !isBefore1950;
            })
            .test('over-18', 'You must be over 18 years old', function (value) {
                if (!value) {
                    return false;
                }

                const age = moment().diff(value, 'years');
                return age >= 18;
            })
            .typeError("Date of Birth is required"),
        departureDate: yup.date()
            .transform((originalValue) => {
                return originalValue ? formatDate(originalValue) : originalValue;
            }).required('Departure Date is required')
            .test('valid-date', 'Invalid date. the current year.', function (value) {
                if (!value) {
                    return false;
                }

                const currentDate = moment();
                const isFuture = moment(value).isAfter(currentDate);
                return !isFuture
            })
            .min(yup.ref('birthDate'), 'Start Date cannot be before Date of Birth')
            .typeError("Departure Date is required"),
        department: yup.string()
            .matches(stringRegex, onlyString)
            .required('Department is required'),
        address: yup.string()
            .matches(/^[a-zA-Z0-9-]+$/, "Only alphabets and numbers are allowed for this field")
            .required('Address is required'),
        postalCode: yup.string()
            .matches(/^[0-9]+$/, "Must be only digits")
            .required('Zip Code is required'),
        city: yup.string()
            .matches(/^[a-zA-Z0-9-]+$/, onlyString)
            .required('City is required')
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        validationSchema.validate(formData, {abortEarly: false})
            .then(async () => {
                const response = await fetch('http://localhost:4200/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(formData)
                });

                if (response.status === 201) {
                    setInterval(()=>setLoading(false),1000)
                    setIsModalVisible(true);
                }
            })
            .catch(validationErrors => {
                const err = {};
                validationErrors.inner.forEach(error => {
                    setLoading(false)
                    err[error.path] = error.message;
                });
                setErrors(err);
            });
    };

    const config = {
        isVisible: isModalVisible,
        title: "confirmation",
        text: "employee added",
        onClose: handleClose,
        styles: {
            overlay: {backgroundColor: 'rgba(0, 0, 0, 0.7)'},
            modal: {width: '350px', height: '200px'},
            title: {color: '#43970a'},
            text: {fontSize: '18px'},
        },
    };

    const handleDropdownChange = (name, selectedValue) => {
        setFormData(prevState => ({...prevState, [name]: selectedValue}));
    };
    const stylePropsDatePicker = {
        inputStyle: {
            border: '2px solid #ccc',
            borderRadius: '5px',
            padding: '10px',

        },
        dropdownStyle: {
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        },
        selectedDayStyle: {
            backgroundColor: '#4CAF50',
            color: 'white',
        },
        dayStyle:{
            backgroundColor: 'red',
        }
    };

    const stylePropsDropdown = {
        dropdownButtonStyle: {
        },
        arrowIconStyle: {

        },
        dropdownMenuStyle: {

        },
    };

    return (
        <div className={styles.container}>
            <h1>Create Employer Personal Data</h1>
            <label className={styles.checkbox}>
                Are you an ancient employee?
                <div >
                    <input
                        type="checkbox"
                        id="ancientEmployeeYes"
                        name="ancientEmployee"
                        checked={isAncienEmployee}
                        onChange={() => setIsAncienEmployee(!isAncienEmployee)}
                    />
                    <label htmlFor="ancientEmployeeYes">No</label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="ancientEmployeeNo"
                        name="ancientEmployee"
                        checked={!isAncienEmployee}
                        onChange={() => setIsAncienEmployee(!isAncienEmployee)}
                    />
                    <label htmlFor="ancientEmployeeNo">Yes</label>
                </div>
            </label>
            <hr />
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}/>
                    {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
                </label>
                <label>
                    Last Name:
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}/>
                    {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
                </label>
                <label>
                    States:
                    <Dropdown
                        value={formData.states}
                        styleProps={stylePropsDropdown}
                        onChange={(selectedValue) => handleDropdownChange('states', selectedValue)}
                        placeholder="Select a state..."
                    >
                        {data.states.map((state, index) => (
                            <div className="dropdown-menu-item" key={index} data-value={state.name}>
                                {state.name}
                            </div>
                        ))}
                    </Dropdown>

                    {errors.states && <p className={styles.error}>{errors.states}</p>}
                </label>

                <label>
                    Date of Birth:
                    <DatePicker
                        value=""
                        onChange={(formattedDate) => formData.birthDate = formattedDate}
                        params={{dateFormat: 'MM/DD/YYYY', subtractYears: 18, today: false}}
                        styleProps={stylePropsDatePicker}
                    />
                    {errors.birthDate && <p className={styles.error}>{errors.birthDate}</p>}
                </label>
                <label>
                    Start Date:
                    <DatePicker
                        value=""
                        onChange={(formattedDate) => formData.departureDate = formattedDate}
                        params={{dateFormat: 'MM/DD/YYYY', subtractYears: 0, today: true}}
                        styleProps={stylePropsDatePicker}
                    />
                    {errors.departureDate && <p className={styles.error}>{errors.departureDate}</p>}
                </label>
                <label>
                    Department:
                    <Dropdown
                        value={formData.department}
                        onChange={(selectedValue) => handleDropdownChange('department', selectedValue)}
                        placeholder="Select a department..."
                    >
                        {[  {name:'Sales'},
                            {name:'Marketing'},
                            {name:'Engineering'},
                            {name:'Human Resources'},
                            {name:'Legal'}].map((dep, index) => (
                            <div className="dropdown-menu-item" key={index} data-value={dep.name}>
                                {dep.name}
                            </div>
                        ))}
                    </Dropdown>

                    {errors.department && <p className={styles.error}>{errors.department}</p>}
                </label>
                <label>
                    Address:
                    <textarea type="text" name="address" value={formData.address} onChange={handleChange}/>
                    {errors.address && <p className={styles.error}>{errors.address}</p>}
                </label>
                <label>
                    Zip Code:
                    <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange}/>
                    {errors.postalCode && <p className={styles.error}>{errors.postalCode}</p>}
                </label>
                <label>
                    City:
                    <input type="text" name="city" value={formData.city} onChange={handleChange}/>
                    {errors.city && <p className={styles.error}>{errors.city}</p>}
                </label>
                <button type="submit" >{isLoading ? <span className={styles.ldsdualring}/> : "Save"}</button>
            </form>
            <Modal config={config}>
                <Link className={styles.link} to={'/list'}>go to the list page</Link>
            </Modal>

        </div>

    );
}

export default Create