/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable jsx-quotes */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../UI/Button.jsx';
import Modal from '../../UI/Modal.jsx';
import { useAddAReviewMutation } from '../../../services/reviews.js';
import StarRating from './StarRating.jsx';
import CharacteristicsTable from './CharacteristicsTable.jsx';
import styles from './AddReviewModal.module.css';

export default class AddReviewModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product_id: props.productId,
      rating: 0,
      summary: '',
      body: '',
      recommend: false,
      name: '',
      email: '',
      photos: [],
      characteristics: {},
    };
    this.handleRecommendOptionChange = this.handleRecommendOptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleSummaryChange = this.handleSummaryChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCharacteristicChange = this.handleCharacteristicChange.bind(this);
    this.handleRatingSelection = this.handleRatingSelection.bind(this);
  }

  handleSubmit(e) {
    const { addAReview } = this.props;
    e.preventDefault();
    console.log(this.state);
    addAReview(this.state);
  }

  handleRecommendOptionChange(e) {
    const recommendOption = e.currentTarget.value === 'true';
    this.setState({ recommend: recommendOption });
  }

  handleCharacteristicChange(e) {
    const { name, value } = e.target;
    const { characteristics } = this.state;
    if (name) {
      this.setState((prevState) => (
        { characteristic: { ...prevState.characteristic, [name]: Number(value) } }
      ));
    }
  }

  handleRatingSelection(ratingSelection) {
    this.setState({ rating: ratingSelection });
  }

  handleSummaryChange(e) {
    this.setState({ summary: e.target.value });
  }

  handleBodyChange(e) {
    this.setState({ body: e.target.value });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  render() {
    const {
      handleModalToggle, productName, characteristicId,
    } = this.props;
    const {
      body, date, photos, rating, recommend, reviewer_name, summary, name, email,
    } = this.state;

    return (
      <Modal>
        <div>
          <form onSubmit={this.handleSubmit} className={styles.add_review_box}>
            <h1>Write Your Review</h1>
            <h3>
              {`About the ${productName}`}
            </h3>
            <div>
              <StarRating onChange={this.handleRatingSelection} />
            </div>
            <div>
              Do you recommend this product ?
              <label>
                <input
                  type='radio'
                  name='recommendOption'
                  value='true'
                  checked={recommend === true}
                  onChange={this.handleRecommendOptionChange}
                  className='recommend_input'
                />
                Yes
              </label>
              <label>
                <input
                  type='radio'
                  name='recommendOption'
                  value='false'
                  checked={recommend === false}
                  onChange={this.handleRecommendOptionChange}
                  className='recommend_input'
                />
                No
              </label>
            </div>
            <CharacteristicsTable
              characteristicId={characteristicId}
              handleCharacteristicChange={this.handleCharacteristicChange}
            />
            <div>
              <textarea
                value={summary}
                placeholder="Review Title"
                maxLength='60'
                cols='60'
                rows='2'
                onChange={(e) => this.handleSummaryChange(e)}
              >
              </textarea>
            </div>
            <div>
              <textarea
                value={body}
                placeholder='Why do you like the product?'
                minLength='50'
                maxLength='1000'
                cols='60'
                rows='5'
                onChange={(e) => this.handleBodyChange(e)}
              >
              </textarea>
              <div className={styles.charReq}>
                {body.length < 50 && (
                  <span className={styles.charLeft}>
                    {`
                    Minimum required characters left:
                    ${0 + body.length}
                    / 50
                    `}
                  </span>
                )}
              </div>
            </div>
            <div>
              {'Add an image, \'Coming Soon\''}
            </div>
            <input
              type='text'
              value={name}
              placeholder="What is your nickname"
              onChange={(e) => this.handleNameChange(e)}
            />
            <input
              type='email'
              value={email}
              placeholder="username@gmail.com"
              onChange={(e) => this.handleEmailChange(e)}
            />
            <Button type="submit" onClick={this.handleSubmit}>
              Send Review
            </Button>
          </form>
          <Button type="button" onClick={() => handleModalToggle()}>
            Close
          </Button>
        </div>
      </Modal>
    );
  }
}

AddReviewModal.propTypes = {
  handleModalToggle: PropTypes.func.isRequired,
  productName: PropTypes.string.isRequired,
  characteristicId: PropTypes.shape({ subProp: PropTypes.string }).isRequired,
  productId: PropTypes.number.isRequired,
  addAReview: PropTypes.func.isRequired,
};

// Notes :
// Add the error message on submit, if missing fields.
// Add * to fields that are required.
// Finish Rating
// CSS Page
