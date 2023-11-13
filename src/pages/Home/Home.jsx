import React from "react";
import Logo from "../../assets/WealthHealth.png";
import Illustration from "../../assets/homePage_Image.png";
import styles from './Home.module.scss';

const Home = () => {

    return (
        <section className={styles.mainContent}>
            <>
                <img src={Illustration} alt="illustration" />
            </>

            <div className={styles.right}>
                <img src={Logo} alt="Logo Wealth Health" className="logo-wealth-health" />
                <div className={styles.rightText}>
                    <p>Discover the new HRnet</p>
                    <p>Your ally for simplified human resources management</p>
                </div>
            </div>
        </section>

    )
}

export default Home;