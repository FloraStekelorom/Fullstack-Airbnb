import React from 'react';
import ReactDOM from 'react-dom';

import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './propertydetails.scss';

class Propertydetails extends React.Component {
  state = {
    propertydetails: null,
  }

  componentDidMount() {
    fetch(`/api/properties/${this.props.property.id}`)
      .then(handleErrors)
      .then(data => {
        console.log(data);
        this.setState({
          propertydetails: data.property,
        })
      })
  }

  render () {
    const { property } = this.props;
    const { id } = property;
    const { propertydetails } = this.state;

    if (!propertydetails) {
      return null;
    }


    const {
      title,
      city,
      country,
      price_per_night,
      images,
    } = propertydetails;

    return (

      <div className="col-4 col-lg-3 mb-4 property">
        <a href="#" className="text-body text-decoration-none">
          <p className="text-uppercase mb-0 text-secondary"><small><b>{city}, {country}</b></small></p>
          <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${images[0].image_url})` }}/>
          <h6 className="mb-0">{title}</h6>
          <p className="mb-0"><small>USD{price_per_night}/night</small></p>
        </a>
      </div>
    )
  }
}

export default Propertydetails;
