/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';
// import PropTypes from 'prop-types';
import styles from './ListContainer.module.css';

// TODO: this wrapper should also provide carousel functionality
export default function ListContainer({ children }) {
  return <div className={styles.listContainer}>{children}</div>;
}

// ListContainer.propTypes = {
//   children: PropTypes.shape.isRequired,
// };
