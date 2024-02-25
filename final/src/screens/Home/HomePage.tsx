import React, {Component} from "react";
import styles from "../../styles/Banner.module.scss";
// import { withRouter } from 'react-router';
import {Container, Grid} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const routeChange = () => {
        const path = `/upload-file`;
        navigate(path);
    };
    return (
        <header className={styles.mediaHeader}>
            <Container>
                <div className={styles.viewportHeader}>
                    <div className={styles.header}>
                        <h1>Generator<br/>Spring i React aplikacija <br/>na osnovu šeme baza podataka</h1>
                        <div className={styles.actions}>
                            <div>
                                <button onClick={routeChange}>Generiši aplikacije</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    );
}

export default Home;
