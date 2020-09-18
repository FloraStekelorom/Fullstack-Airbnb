import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class BookingSummary extends React.Component {
  state = {
    authenticated: false,
    loading: false,
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        })
      })
  }

  render () {
    const { authenticated, loading } = this.state;

    if (!authenticated) {
      return (
        <div className="border p-4 mb-4">
          Please <a href={`/login?redirect_url=${window.location.pathname}`}>log in</a> to make a booking.
        </div>
      );
    };

    return (
      <div>Hello</div>
    )
  }
}
export default BookingSummary;
