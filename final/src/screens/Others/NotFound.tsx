import React, { Component } from "react";
import styles from "../../styles/Banner.module.scss";
// import { withRouter } from 'react-router';
import { Container, Grid } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };

  return (
    <header className={styles.mediaHeader}>
      <Container>
        <div className={styles.viewportHeader}>
          <div className={styles.header}>
            <h1>
              Page not found!
            </h1>
            <div className={styles.actions}>
              {/* Your banner content goes here */}
              <div>
                <button onClick={routeChange}>GO to home</button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default NotFound;
