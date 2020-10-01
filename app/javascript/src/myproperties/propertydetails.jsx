import React from 'react';
import ReactDOM from 'react-dom';
import Carroussel from '@src/carroussel';

import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './propertydetails.scss';

class Propertydetails extends React.Component {
  state = {
    propertydetails: null,
  }

  componentDidMount() {
    this.getProperties();
  }

  getProperties = () => {
    fetch(`/api/properties/${this.props.property.id}`)
      .then(handleErrors)
      .then(data => {
        console.log(data);
        this.setState({
          propertydetails: data.property,
        })
      })
  }

  delete = (id) => {
    if(!id) {
      console.log("no property id");
    }

    fetch(`/api/property/${id}`, safeCredentials({
      method: "DELETE",
      mode:"cors",
      headers: { "Content-Type": "application/json" },
    })).then((data) => {
        console.log('success');
        this.props.getProperties();
      })
      .catch((error) => {
        console.log('could not delete property');
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
        <div href="#" className="text-body text-decoration-none">
          <p className="text-uppercase mb-0 text-secondary"><small><b>{city}, {country}</b></small></p>
          <Carroussel images={images}/>
          <h6 className="mb-0">{title}</h6>
          <p className="mb-0"><small>USD{price_per_night}/night</small></p>
          <div className="col-12">
            <button type="button" className="btn btn-sm btn-danger mx-1 my-1" onClick={() => this.delete(id)}>Delete</button>
            <a type="button" href={`/editproperty/${id}`} className="btn btn-sm btn-danger mx-1 my-1">Edit</a>
            <a type="button" href={`/property/${id}/bookings`}  className="btn btn-sm btn-danger mx-1 my-1">Bookings</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Propertydetails;
