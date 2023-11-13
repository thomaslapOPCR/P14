import React, {useState} from 'react';
import styles from './Create.module.scss';
import * as yup from 'yup';
import data from '../../data/data.json';
import DatePicker from "../../components/DatePicker/DatePicker";
import Modal from "../../components/Modal/Modal";
import {Link} from "react-router-dom";
import Dropdown from "../../components/dropDown/DropDown";

const Create = () => {
    const [errors, setErrors] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleClose = () => setIsModalVisible(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        states: "" || "Alabama",
        birthDate: "",
        departureDate: "",
        department: "" || "Sales",
        address: "",
        postalCode: "",
        city: "",
    });
/*
* age mini / max
*
* */
    function formatDate(date) {
        const d = new Date(date);
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const year = d.getFullYear();
        return new Date(year, month - 1, day);
    }


    const onlyString = "Only alphabets are allowed for this field";
    const stringRegex = /^[aA-zZ\s]+$/;
    const today = new Date();
    const maxBirthDate = new Date(1950 + 62, today.getMonth(), today.getDate());
    const minBirthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    const validationSchema = yup.object().shape({
        firstName: yup.string().matches(stringRegex, onlyString).required('First Name is required'),
        lastName: yup.string().matches(stringRegex, onlyString).required('Last Name is required'),
        states: yup.string().matches(stringRegex, onlyString).required('State is required'),
        birthDate: yup.date().transform((originalValue) => {
            return originalValue ? formatDate(originalValue) : originalValue;
        }).required('Date of Birth is required')
            .max(maxBirthDate, 'You cannot be older than 62 years old'),
        departureDate: yup.date().transform((originalValue) => {
            return originalValue ? formatDate(originalValue) : originalValue;
        }).required('Departure Date is required')
            .min(yup.ref('birthDate'), 'Departure Date cannot be before Date of Birth'),
        department: yup.string().matches(stringRegex, onlyString).required('Department is required'),
        address: yup.string().matches(/^[a-zA-Z0-9 ]+$/, "Only alphabets and numbers are allowed for this field").required('Address is required'),
        postalCode: yup.number().required('Zip Code is required').integer('Only numbers are allowed for this field'),
        city: yup.string().matches(stringRegex, onlyString).required('City is required') });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validationSchema.validate(formData, { abortEarly: false })
            .then(async () => {
                const response = await fetch('http://localhost:4200/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(formData)
                });

                if(response.status === 201) {
                    setIsModalVisible(true);
                }
            })
            .catch(validationErrors => {
                const err = {};
                validationErrors.inner.forEach(error => {
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
            overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)'},
            modal: {width:'350px',height:'200px'},
            title: { color: '#43970a' },
            text: { fontSize: '18px' },
        },
    };

    const handleDropdownChange = (name, selectedValue) => {
        setFormData(prevState => ({ ...prevState, [name]: selectedValue }));
    };


    return (
        <div className={styles.container}>
            <h1>Create Employer Personal Data</h1>
            <form  className={styles.form} onSubmit = {handleSubmit}>
                <label>
                    First Name:
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                    {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
                </label>
                <label>
                    Last Name:
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                    {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
                </label>
                <label>
                    States:
                    <Dropdown
                        value={formData.states}
                        onChange={(selectedValue) => handleDropdownChange('states', selectedValue)}
                        placeholder="Select a state..."
                    >
                        {data.states.map((state, index) => (
                            <div className="dropdown-menu-item" key={index} data-value={state.name}>
                                {state.name}
                            </div>
                        ))}
                    </Dropdown>
                    <p>{formData.states}</p>
                    {errors.states && <p className={styles.error}>{errors.states}</p>}
                </label>

                <label>
                    Date of Birth:
                    <DatePicker
                        value=""
                        onChange={(formattedDate) => {
                            console.log(formattedDate)
                            formData.birthDate = formattedDate
                        }}
                        params={{ dateFormat: 'MM/DD/YYYY', subtractYears: 18, today: false }}
                    />
                    <p>{formData.birthDate}</p>
                    {errors.birthDate && <p className={styles.error}>{errors.birthDate}</p>}
                </label>
                <label>
                    Start Date:
                    <DatePicker
                        value=""
                        onChange={(formattedDate) => {
                            formData.departureDate = formattedDate;
                        }}
                        params={{ dateFormat: 'MM/DD/YYYY', subtractYears: 0,today: true }}
                    />
                    <p>{formData.departureDate}</p>
                    {errors.departureDate && <p className={styles.error}>{errors.departureDate}</p>}
                </label>
                <label>
                    Department:
                    <select name="department" value={formData.department} onChange={handleChange}>
                        {['Sales', 'Marketing', 'Engineering', 'Human Resources', 'Legal'].map((dep,index) =>
                            <option key={index} value={dep}>{dep}</option>
                        )}
                    </select>
                    {errors.department && <p className={styles.error}>{errors.department}</p>}
                </label>
                <label>
                    Address:
                    <textarea type="text" name="address" value={formData.address} onChange={handleChange} />
                    {errors.address && <p className={styles.error}>{errors.address}</p>}
                </label>
                <label>
                    Zip Code:
                    <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                    {errors.postalCode && <p className={styles.error}>{errors.postalCode}</p>}
                </label>
                <label>
                    City:
                    <input type="text" name="city" value={formData.city} onChange={handleChange} />
                    {errors.city && <p className={styles.error}>{errors.city}</p>}
                </label>
                <button type="submit">Save</button>
            </form>
            <Modal config={config}>
                <Link className={styles.link} to={'/list'} >go to the list page</Link>
            </Modal>
        </div>

    );
}

export default Create