import React from 'react';
import Logo from '../../assets/HRnet.png';
import style from './Navigation.module.scss';
import {NavLink } from "react-router-dom";


const Navigation = () => {

    return (
        <div className={style.container}>
            <div className={style.header}>
                <NavLink to={"/"}>
                    <img src={Logo} alt="Logo HRNET" className="logo" />
                </NavLink>
                <div className={style.buttons}>
                    <NavLink  to={"/create"} className={style.btn}>Add an employee</NavLink>
                    <NavLink to={"/list"} className={style.btn}>List of employees</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Navigation;