import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';

import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './propertysuccess.scss';

class Propertysuccess extends React.Component {
  state = {
    property: {},
    loading: true,
  }

  componentDidMount() {
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

  render () {
    const { property, loading } = this.state;

    if (loading) {
      return <p>loading...</p>;
    };

    return (
      <Layout >
        <div className="container text-center">
          <i className="fa fa-check-circle text-danger text-center"></i>
          <div className="row">
            <div className="col-12">
              <div>Your property <b>{property.title}</b> is now live!</div>
              <div className="my-2">City: {property.city}</div>
              <div className="my-2">Country: {property.country}</div>
              <div className="my-2">Maximum guests: {property.max_guests}</div>
              <div className="my-2">Price per night: US${property.price_per_night}</div>
            </div>
            <div className="col-12">
              <div className="property-image my-2 rounded" style={{ backgroundImage: `url(${property.images[0].image_url})` }} />
            </div>
            <div className="col-12">
              <a role="button" href={`/myproperties`} className="btn btn-danger my-3">See all my properties</a>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
export default Propertysuccess;
