/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams,
} from 'react-router-dom';
import Overview from './features/Overview/Overview.jsx';
// import RatingsAndReviews from './features/RatingsAndReviews/RatingsAndReviews.jsx';
// import QuestionsAndAnswers from './features/QuestionsAndAnswers/QuestionsAndAnswers.jsx';
// import RelatedItemsAndComparison from './features/RelatedItemsAndComparison/RelatedItemsAndComparison.jsx';
import styles from './App.module.css';

function ProductDetailPage() {
  const { productId } = useParams();
  return (
    <div id="app" className={styles.app}>
      <Overview currentViewItemId={+productId} />
      <QuestionsAndAnswers currentViewItemId={+productId} />
      <RelatedItemsAndComparison currentViewItemId={+productId} />
      <RatingsAndReviews currentViewItemId={+productId} />
    </div>
  );
}
export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/product/40344" />
        </Route>
        <Route path="/product/:productId" exact>
          <ProductDetailPage />
        </Route>
      </Switch>
    </Router>
  );
}
