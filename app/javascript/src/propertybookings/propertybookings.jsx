// property.jsx
import React from 'react';
import Layout from '@src/layout';
import BookingSummary from './bookingSummary';

import { handleErrors } from '@utils/fetchHelper';

import './propertybookings.scss';

class Propertybookings extends React.Component {
  state = {
    authenticated: false,
    property: {},
    loading: true,
    futureBookings: {},
    futureLoading: true,
    pastBookings: {},
    pastLoading: true,
  }

  componentDidMount() {

    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        })
      })

      this.getPropertyDetails();
      this.getFuturePropertyBookings();
      this.getPastPropertyBookings();
  }

  getPropertyDetails = () => {
    fetch(`/api/properties/${this.props.property_id}`)
      .then(handleErrors)
      .then(data => {
        console.log(data);
        this.setState({
          property: data.property,
          loading: false,
        })
      })
  }

  getFuturePropertyBookings = () => {
    fetch(`/api/property/${this.props.property_id}/bookings`)
      .then(handleErrors)
      .then(data => {
        console.log(data);
        this.setState({
          futureBookings: data.bookings,
          futureLoading: false,
        })
      })
  }

  getPastPropertyBookings = () => {
    fetch(`/api/property/${this.props.property_id}/pastbookings`)
      .then(handleErrors)
      .then(data => {
        console.log(data);
        this.setState({
          pastBookings: data.bookings,
          pastLoading: false,
        })
      })
    }

  render () {
    const { authenticated, property, loading, futureBookings, pastBookings, futureLoading, pastLoading } = this.state;
    const { title, images, id } = property

    if (loading) {
      return <p>loading...</p>;
    };

    if (!authenticated) {
      return (
        <div className="border p-4 mb-4">
          Please <a href={`/login?redirect_url=${window.location.pathname}`}>log in</a> to see your property bookings.
        </div>
      );
    };

    return (
      <Layout>
        <div className="container ">
          <div className="row">
            <div className="col-12">
              <div className="text-right mt-1 mb-1">
                <a role="button" href={`/myproperties`} className="btn btn-danger">Back to properties</a>
              </div>
              <div className="title text-center text-danger mt-4 mb-3"><b>{title}</b>
              </div>
              <div className="property-image my-2 rounded" style={{ backgroundImage: `url(${property.images[0].image_url})` }} />
            </div>
          </div>
          <div className="row">
            <div className="mt-2"><b>List of future bookings:</b></div>
          </div>
          <div className="row">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Booking ID</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Client Name</th>
                  <th scope="col">Paid?</th>
                </tr>
              </thead>
              {futureBookings.length > 0 ? futureBookings.map((booking) => {
                return (
                  <BookingSummary
                  key={booking.id}
                  booking={booking}
                  />);
              }) : <tbody></tbody>}
            </table>
            {futureBookings.length > 0 ? <p></p>: <p>No future booking</p>}
          </div>
          {futureLoading && <p>loading...</p>}
          <div className="row">
            <div className="mt-2"><b>List of past bookings:</b></div>
          </div>
          <div className="row">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Booking ID</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Client Name</th>
                  <th scope="col">Paid?</th>
                </tr>
              </thead>
              {pastBookings.length > 0 ? pastBookings.map((booking) => {
                return (
                  <BookingSummary
                  key={booking.id}
                  booking={booking}
                  />);
              }) : <tbody></tbody>}
            </table>
            {pastBookings.length > 0 ? <p></p>: <p>No past booking</p>}
          </div>
          {pastLoading && <p>loading...</p>}
        </div>
      </Layout>
    )
  }
}

export default Propertybookings
