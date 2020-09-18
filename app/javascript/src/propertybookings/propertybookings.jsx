// property.jsx
import React from 'react';
import Layout from '@src/layout';
import BookingSummary from './bookingSummary';

import { handleErrors } from '@utils/fetchHelper';

import './propertybookings.scss';

class Propertybookings extends React.Component {
  state = {
    propertybookings: {},
    loading: false,
  }

  componentDidMount() {

  }

  render () {
    const { propertybookings, loading } = this.state;
    if (loading) {
      return <p>loading...</p>;
    };


    return (
      <Layout>
        <div>Property Bookings</div>
        <BookingSummary />

      </Layout>
    )
  }
}

export default Propertybookings
