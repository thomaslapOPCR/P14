import React from 'react';
import Navigation from "../navigation/Navigation.jsx";
import Footer from "../footer/Footer.jsx";
import {Outlet} from "react-router-dom";
import styles from '../../styles/Layout.module.scss';

export const BaseLayout = () => {
    return (
        <div className={styles.container}>
            <header>
                <Navigation/>
            </header>

            <main>
                <Outlet/>
            </main>

            <footer>
                <Footer/>
            </footer>
        </div>
    )
}