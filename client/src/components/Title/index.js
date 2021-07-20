import React from 'react';
import styles from './Title.module.scss';

const Title = () =>{
    return(
      <div className={styles.title}>
        <p>Your todo list</p>
      </div>
    );
}

export default Title;
