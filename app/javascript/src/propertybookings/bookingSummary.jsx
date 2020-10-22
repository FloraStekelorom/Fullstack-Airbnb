import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import moment from 'moment';

import './bookingSummary.scss';

class BookingSummary extends React.Component {
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

  render () {
    const { booking } = this.props;
    const { id, user } = booking;
    const { bookingdetails} = this.state;

    if (!bookingdetails) {
      return null;
    }

    const {
      start_date,
      end_date,
      property,
      charges,
      is_paid,
    } = bookingdetails;

    console.log(start_date);
    console.log(is_paid);

    return (
      <tbody>
        <tr>
          <th scope="row">{id}</th>
          <td>{moment(start_date).format("DD MMM YY")}</td>
          <td>{moment(end_date).format("DD MMM YY")}</td>
          <td>{user}</td>
          <td>{is_paid ? <p className="text-currency">Paid <i className="fa fa-check text-success"></i></p> : <p className="text-currency">Not Paid <i className="fa fa-times text-danger"></i></p>}</td>
        </tr>
      </tbody>
    )
  }
}
export default BookingSummary;
