import React from 'react';
import Logo from "../../assets/mililogo.png";
import style from './Footer.module.scss';


const Footer = () => {
    return (
        <div className={style.footer}>
            <img src={Logo} alt="Logo HRNET" className={style.logoWealthHealth} />
            <div className={style.copyright}>
                <p className={style.footerText}>WealthHealth, Copyright © 2022 - 2023</p>
                <p className={style.footerText}>All rights reserved</p>
            </div>
        </div>
    );
}

export default Footer;