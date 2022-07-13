/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
// /* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-one-expression-per-line */

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useProductStylesQuery, useProductInformationByIdQuery } from '../../../services/products';
import ListItemCard from '../helpers/ListItemCard/ListItemCard.jsx';
import ComparisonModal from '../ComparisonModal/ComparisonModal.jsx';

export default function RelatedProductItem({ productId }) {
  const [toggleModal, setToggleModal] = useState(false);
  const { data, error, isLoading } = useProductInformationByIdQuery(productId);
  const { data: styles } = useProductStylesQuery(productId);
  const image = styles?.results[0].photos[0].thumbnail_url || 'https://picsum.photos/200';

  const handleModalToggle = () => {
    setToggleModal(!toggleModal);
  };

  if (error) {
    return <>Oh no, there was an error</>;
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      {toggleModal
      && createPortal(<ComparisonModal handleModalToggle={handleModalToggle} />, document.getElementById('modal'))}
      <ListItemCard
        product={data}
        productId={productId}
        productImage={image}
        actionButtonIcon="⭐️"
        handleOnClick={handleModalToggle}
      />
    </>
  );
}

RelatedProductItem.propTypes = {
  productId: PropTypes.number.isRequired,
};