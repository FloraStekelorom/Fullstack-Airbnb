import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';

import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './bookingsuccess.scss';

class Bookingsuccess extends React.Component {
  state = {
    booking: {},
    loading: true,
  }

  componentDidMount() {
    fetch(`/api/bookings/${this.props.booking_id}`)
      .then(handleErrors)
      .then(data => {
        console.log(data);
        this.setState({
          booking: data.booking,
          loading: false,
        })
      })
  }

  render () {
    const { booking, loading } = this.state;

    if (loading) {
      return <p>loading...</p>;
    };

    const {
      id,
      start_date,
      end_date,
      property,
    } = booking

    return (
      <Layout >
        <div className="container text-center">
          <i className="fa fa-check-circle text-danger text-center"></i>
          <div className="row">
            <div className="col-12">
              <div>Your stay at <b>{property.title}</b> is successfully booked!</div>
              <div className="booking-dates my-2">Check in date: {start_date}        Check out date: {end_date}</div>
            </div>
            <div className="col-12">
              <div className="property-image my-2 rounded" style={{ backgroundImage: `url(${property.images[0].image_url})` }} />
            </div>
            <div className="col-12">
              <a role="button" href={`/mybookings`} className="btn btn-danger my-3">See all my bookings</a>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
export default Bookingsuccess;
