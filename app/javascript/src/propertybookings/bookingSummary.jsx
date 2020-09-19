import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import moment from 'moment';

class BookingSummary extends React.Component {

  render () {
    const { booking } = this.props;
    const { id, start_date, end_date, user } = booking;

    console.log(start_date);

    return (
      <tbody>
        <tr>
          <th scope="row">{id}</th>
          <td>{moment(start_date).format("DD MMM YY")}</td>
          <td>{moment(end_date).format("DD MMM YY")}</td>
          <td>{user}</td>
          <td>Paid</td>
        </tr>
      </tbody>
    )
  }
}
export default BookingSummary;
