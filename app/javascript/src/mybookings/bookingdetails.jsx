import React from 'react';
import ReactDOM from 'react-dom';

import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './bookingdetails.scss';

class Bookingdetails extends React.Component {
  state = {
    bookingdetails: null,
  }

  componentDidMount() {
    this.getBookings();
  }

  getBookings = () => {
    fetch(`/api/bookings/${this.props.booking.id}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          bookingdetails: data.booking,
        })
      })
  }

  delete = (id) => {
    if(!id) {
      console.log("no booking id");
    }

    fetch(`/api/booking/${id}`, safeCredentials({
      method: "DELETE",
      mode:"cors",
      headers: { "Content-Type": "application/json" },
    })).then((data) => {
        console.log('success');
        this.props.getUpcomingBookings();
      })
      .catch((error) => {
        console.log('could not delete property');
      })
  }


  initiateStripeCheckout = () => {
    return fetch(`/api/charges?booking_id=${this.props.booking.id}&cancel_url=${window.location.pathname}`, safeCredentials({
      method: 'POST',
    }))
      .then(handleErrors)
      .then(response => {
        const stripe = Stripe(process.env.STRIPE_PUBLISHABLE_KEY);
        stripe.redirectToCheckout({
          // Make the id field from the Checkout Session creation API response
          // available to this file, so you can provide it as parameter here
          // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
          sessionId: response.charge.checkout_session_id,
        }).then((result) => {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  render () {
    const { booking } = this.props;
    const { id } = booking;
    const { bookingdetails } = this.state;

    if (!bookingdetails) {
      return null;
    }

    const {
      start_date,
      end_date,
      property,
      charges,
    } = bookingdetails;
    const {
      title,
      city,
      country,
      images,
    } = property;

    console.log(bookingdetails);

    return (

      <div className="col-4 col-lg-3 mb-4 property">
        <a href="#" className="text-body text-decoration-none">
          <p className="text-uppercase mb-0 text-secondary"><small><b>{city}, {country}</b></small></p>
          <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${images[0].image_url})` }} />
          <h6 className="mb-0">{title}</h6>
          <p className="mb-0"><small>Booked from {start_date} to {end_date} </small></p>
          {charges[0].amount && <p className="text-currency">Paid {charges[0].currency.toUpperCase()}{charges[0].amount} <i className="fa fa-check text-success"></i></p>}
          {charges[0].amount && <button role="button" onClick={this.initiateStripeCheckout} className="btn btn-danger btn-sm">Pay Now!</button>}
          <button type="button" className="btn btn-sm btn-danger mx-1 my-1" onClick={() => this.delete(id)}>Delete</button>
        </a>
      </div>
    )
  }
}

export default Bookingdetails;
