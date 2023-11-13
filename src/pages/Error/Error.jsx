import React from 'react';
import {Link} from "react-router-dom";
import styles from "./Error.module.scss";
const Error = () => {
    return (
        <div className={styles.container}>
            <h1>Erreur 404</h1>
            <p>La page demander n'ai pas reconue</p>
            <Link to={"/"} > retour vers la page d'acceuil</Link>
        </div>
    )
}

export default Error