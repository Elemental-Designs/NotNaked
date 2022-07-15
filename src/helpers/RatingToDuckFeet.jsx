import React from 'react';
import PropTypes from 'prop-types';
import FullDuck from '../../assets/duckFeet-rating/full.svg';
import ThirdFull from '../../assets/duckFeet-rating/third.svg';
import HalfFull from '../../assets/duckFeet-rating/half.svg';
import QuarterFull from '../../assets/duckFeet-rating/quarter.svg';
import EmptyDuck from '../../assets/duckFeet-rating/empty.svg';
import styles from './RatingToDuckFeet.module.css';

export default function RatingToDuckFeet({ rating }) {
  const number = +rating.toFixed(0);
  const floatNum = Math.round((number - rating) * 4);
  const rest = 5 - Math.ceil(rating);
  console.log(number - rating);

  const FULL = <img className={styles.feet} src={FullDuck} alt="full duck" />;
  const THIRD = <img className={styles.feet} src={ThirdFull} alt="full duck" />;
  const HALF = <img className={styles.feet} src={HalfFull} alt="full duck" />;
  const QUARTER = <img className={styles.feet} src={QuarterFull} alt="full duck" />;
  const EMPTY = <img className={styles.feet} src={EmptyDuck} alt="full duck" />;

  let float;

  switch (floatNum) {
    case 0:
      float = EMPTY;
      break;
    case 1:
      float = QUARTER;
      break;
    case 2:
      float = HALF;
      break;
    case 3:
      float = THIRD;
      break;
    case 4:
      float = FULL;
      break;
    default:
      float = '';
  }

  return (
    <div className={styles.rating_ctn}>
      {Array(number).fill(FULL)}
      {float}
      {number - rating === 0 && Array(rest).fill(EMPTY)}
    </div>
  );
}

RatingToDuckFeet.propTypes = {
  rating: PropTypes.number.isRequired,
};
