import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import Propertydetails from '@src/myproperties/propertydetails';


import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './myproperties.scss';

class Myproperties extends React.Component {
  state = {
    authenticated: false,
    mylistedproperties: [],
    total_pages: null,
    next_page: null,
    loading: true,
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        })
      })

    this.getProperties();
  }

  getProperties = () => {
    fetch(`/api/mylistedproperties?page=1`)
      .then(handleErrors)
      .then(data => {
        console.log(data);
        this.setState({
          mylistedproperties: data.properties,
          total_pages: data.total_pages,
          next_page: data.next_page,
          loading: false,
        })
      })
  }

  loadMoreProperties = () => {
      if (this.state.next_page === null) {
        return;
      }
      this.setState({ loading: true });
      fetch(`/api/mylistedproperties?page=${this.state.next_page}`)
        .then(handleErrors)
        .then(data => {
          this.setState({
            mylistedproperties: this.state.mylistedproperties.concat(data.properties),
            total_pages: data.total_pages,
            next_page: data.next_page,
            loading: false,
          })
        })
    }


  render () {
    const { authenticated, mylistedproperties, loading, next_page, total_pages } = this.state;


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
              <div className="title text-center text-danger mt-4 mb-5"><b>Your Properties</b>
              </div>
              <div className="text-right mt-1 mb-1">
                <a role="button" href={`/listmyproperty`} className="btn btn-danger">List my property</a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div><b>My listed properties:</b></div>
              <div className="row">
              {mylistedproperties.length > 0 ? mylistedproperties.map((property) => {
                  return (
                    <Propertydetails
                    key={property.id}
                    property={property}
                    getProperties={this.getProperties}
                    />);
                }) : <p>No listed property</p>}
              </div>
              {(loading || next_page === null) ||
              <div className="text-center">
                <button
                  className="btn btn-light mb-3"
                  onClick={this.loadMoreProperties}
                >Load more</button>
              </div>
            }
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
export default Myproperties;
