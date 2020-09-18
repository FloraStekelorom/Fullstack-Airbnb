import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class BookingSummary extends React.Component {

  render () {
    const { booking } = this.props;
    const { id, start_date, end_date, user } = booking;

    console.log(start_date);

    return (
      <tbody>
        <tr>
          <th scope="row">{id}</th>
          <td>{start_date}</td>
          <td>{end_date}</td>
          <td>{user}</td>
          <td>Paid</td>
        </tr>
      </tbody>
    )
  }
}
export default BookingSummary;
