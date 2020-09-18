import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './layout.scss';

class Layout extends React.Component {
  state = {
    authenticated: false,
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        })
        console.log(data);
      })
  }

    logout = (e) => {
      event.preventDefault();

      fetch(`/api/sessions`, safeCredentials({
        method: 'DELETE',
      }))
      .then(handleErrors)
      .then(res => {
        if (res.success) {
          const params = new URLSearchParams(window.location.search);
          const redirect_url = params.get('redirect_url') || '/';
          window.location = redirect_url;
        }
      })
    }

  render () {
    const { authenticated } = this.state;

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand navbar-light bg-light">
          <div className="navbar-header">
            <a href="/"><span className="navbar-brand mb-0 h1 text-danger">Airbnb</span></a>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle text-danger btn-lg" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-user-circle-o text-danger" aria-hidden="true"></i></a>
                <ul className="dropdown-menu row dropdown-menu-right" role="menu">
                  {authenticated ? <li ><a href="#" className="text-secondary username mx-3"  onClick={this.logout}>Log out</a></li> : <li ><a href={`/login`} className="text-secondary username mx-3">Log in</a></li>}
                  <div className="dropdown-divider"></div>
                  <li ><a href={`/myproperties`} className="text-secondary mx-3">Your properties</a></li>
                  <div className="dropdown-divider"></div>
                  <li ><a href={`/mybookings`} className="text-secondary mx-3">Your bookings</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        {this.props.children}
        <footer className="p-3 bg-light">
          <div>
            <p className="mr-3 mb-0 text-secondary">Airbnb Clone</p>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Layout;
