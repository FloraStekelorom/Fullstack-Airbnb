import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import Bookingdetails from '@src/mybookings/bookingdetails';

import moment from 'moment';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './mybookings.scss';

class Mybookings extends React.Component {
  state = {
    authenticated: false,
    pastbookings: [],
    past_total_pages: null,
    past_next_page: null,
    upcomingbookings: [],
    upcoming_total_pages: null,
    upcoming_next_page: null,
    pastloading: true,
    upcomingloading: true,
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        })
      })

    this.getPastBookings();
    this.getUpcomingBookings();
  }

  getPastBookings = () => {
    fetch(`/api/mypastbookings?page=1`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          pastbookings: data.bookings,
          past_total_pages: data.total_pages,
          past_next_page: data.next_page,
          pastloading: false,
        })
      })
  }

  getUpcomingBookings = () => {
    fetch(`/api/myupcomingbookings?page=1`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          upcomingbookings: data.bookings,
          upcoming_total_pages: data.total_pages,
          upcoming_next_page: data.next_page,
          upcomingloading: false,
        })
      })
  }

  loadMorePastBookings = () => {
      if (this.state.past_next_page === null) {
        return;
      }
      this.setState({ pastloading: true });
      fetch(`/api/mypastbookings?page=${this.state.past_next_page}`)
        .then(handleErrors)
        .then(data => {
          this.setState({
            pastbookings: this.state.pastbookings.concat(data.bookings),
            past_total_pages: data.total_pages,
            past_next_page: data.next_page,
            pastloading: false,
          })
        })
    }

    loadMoreUpcomingBookings = () => {
        if (this.state.upcoming_next_page === null) {
          return;
        }
        this.setState({ upcomingloading: true });
        fetch(`/api/mypastbookings?page=${this.state.upcoming_next_page}`)
          .then(handleErrors)
          .then(data => {
            this.setState({
              upcomingbookings: this.state.upcomingbookings.concat(data.bookings),
              upcoming_total_pages: data.total_pages,
              upcoming_next_page: data.next_page,
              upcomingloading: false,
            })
          })
      }


  render () {
    const { authenticated, pastbookings, past_next_page, upcomingbookings, upcoming_next_page, pastloading, upcomingloading } = this.state;

    if (!authenticated) {
      return (
        <Layout>
          <div className="border p-4 mb-4">
            Please <a href={`/login?redirect_url=${window.location.pathname}`}>log in</a> to see your bookings.
          </div>
        </Layout>
      );
    };

    return (
      <Layout >
        <div className="container ">
          <div className="row">
            <div className="col-12">
              <div className="title text-center text-danger mt-4 mb-5"><b>Your bookings</b>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div><b>Your upcoming bookings:</b></div>
              <div className="row">
                {upcomingbookings.length > 0 ? upcomingbookings.map((booking) => {
                    return (
                      <Bookingdetails
                      key={booking.id}
                      booking={booking}
                      getUpcomingBookings={this.getUpcomingBookings}
                      />);
                  }) : <p>No upcoming booking</p>}
              </div>
              {upcomingloading && <p>loading...</p>}
              {(upcomingloading || upcoming_next_page === null) ||
              <div className="text-center">
                <button
                  className="btn btn-light mb-3"
                  onClick={this.loadMoreUpcomingBookings}
                >Load more</button>
              </div>
            }
              <hr />
              <div><b>Your past bookings:</b></div>
              <div className="row">
                {pastbookings.length > 0 ? pastbookings.map((booking) => {
                    return (
                      <Bookingdetails
                      key={booking.id}
                      booking={booking}
                      />);
                  }) : <p>No past booking</p>}
              </div>
                {pastloading && <p>loading...</p>}
                {(pastloading || past_next_page === null) ||
                <div className="text-center">
                  <button
                    className="btn btn-light mb-3"
                    onClick={this.loadMorePastBookings}
                  >Load more</button>
                </div>
              }
              <div className="text-center mt-3 mb-5">
                <a role="button" href={`/`} className="btn btn-danger">Book another property</a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
export default Mybookings;
