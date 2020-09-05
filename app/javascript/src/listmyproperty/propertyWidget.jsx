import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials,  safeCredentialsForm, handleErrors } from '@utils/fetchHelper';

import './propertyWidget.scss';

class PropertyWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      city: '',
      country: '',
      max_guests: 0,
      property_type: '',
      bedrooms: 0,
      beds: 0,
      baths: 0,
      description: '',
      price_per_night: 0,
    }
    this.uploadedFile = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.createProperty = this.createProperty.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  createProperty(e) {
    if (e) { e.preventDefault(); };

    let formData = new FormData();
    if (this.uploadedFile.current.files[0] == null) {
     formData.set('property[title]', this.state.title);
     formData.set('property[city]', this.state.city);
     formData.set('property[country]', this.state.country);
     formData.set('property[max_guests]', this.state.max_guests);
     formData.set('property[property_type]', this.state.property_type);
     formData.set('property[bedrooms]', this.state.bedrooms);
     formData.set('property[beds]', this.state.beds);
     formData.set('property[baths]', this.state.baths);
     formData.set('property[description]', this.state.description);
     formData.set('property[price_per_night]', this.state.price_per_night);
   } else {

     for (let i = 0; i < this.uploadedFile.current.files.length; i++) {
       formData.append('property[images][]', this.uploadedFile.current.files[i]);
     }
     formData.set('property[title]', this.state.title);
     formData.set('property[city]', this.state.city);
     formData.set('property[country]', this.state.country);
     formData.set('property[max_guests]', this.state.max_guests);
     formData.set('property[property_type]', this.state.property_type);
     formData.set('property[bedrooms]', this.state.bedrooms);
     formData.set('property[beds]', this.state.beds);
     formData.set('property[baths]', this.state.baths);
     formData.set('property[description]', this.state.description);
     formData.set('property[price_per_night]', this.state.price_per_night);
   };

    fetch('/api/properties', safeCredentialsForm({
        method: 'POST',
        body: formData,
      }))
        .then(handleErrors)
        .then(data => {
          console.log('success!');
          const params = new URLSearchParams(window.location.search);
          const redirect_url = params.get('redirect_url') || '/';
          window.location = redirect_url;
        })
        .catch(error => {
          this.setState({
            error: 'Could not save property',
          })
        });

      this.setState({
        title: '',
        city: '',
        country: '',
        max_guests: 0,
        property_type: '',
        bedrooms: 0,
        beds: 0,
        baths: 0,
        description: '',
        price_per_night: 0,
      });

     document.getElementById("images").value = null;
  }

    render () {
        const { title, city, country, max_guests, property_type, bedrooms, beds, baths, description, price_per_night } = this.state;

        return (
          <React.Fragment>
            <form onSubmit={this.createProperty}>
              <div className="form-group">
                <label htmlFor="propertyTitle"><b>Property Title</b></label>
                <input name="title" type="text" className="form-control form-control-lg mb-3" placeholder="Property Title" value={title} onChange={this.handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="propertyLocation"><b>Property Location</b></label>
                <input name="city" type="text" className="form-control form-control-lg mb-3" placeholder="City" value={city} onChange={this.handleChange} required />
                <input name="country" type="text" className="form-control form-control-lg mb-3" placeholder="Country" value={country} onChange={this.handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="max_guests"><b>Number of Guests</b></label>
                <input name="max_guests" type="number" className="form-control form-control-lg mb-3" placeholder="Number of max_guests" value={max_guests} onChange={this.handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="propertyDetails"><b>Property Details</b></label>
                <select name="property_type" className="form-control" value={property_type} onChange={this.handleChange} id="bedrooms">
                  <option>private room in house</option>
                  <option>entire house</option>
                  <option>private room in apartment</option>
                  <option>entire apartment</option>
                </select>
                <input name="bedrooms" type="number" className="form-control form-control-lg mb-3" placeholder="Number of bedrooms" value={bedrooms} onChange={this.handleChange} required />
                <input name="beds" type="number" className="form-control form-control-lg mb-3" placeholder="Number of beds" value={beds} onChange={this.handleChange} required />
                <input name="baths" type="number" className="form-control form-control-lg mb-3" placeholder="Number of baths" value={baths} onChange={this.handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="description"><b>Property Description</b></label>
                <textarea className="form-control" id="description" name="description" value={description} onChange={this.handleChange} rows="3"></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="price_per_night"><b>Price per night</b></label>
                <input name="price_per_night" type="number" className="form-control form-control-lg mb-3" placeholder="Price per night" value={price_per_night} onChange={this.handleChange} required />
              </div>
              <div className="form-group">
                <label id="upload-image-btn" htmlFor="images"><b>Property Images</b></label>
                <input type="file" id="images" name="images" accept="images/*" ref={this.uploadedFile} multiple/>
              </div>

              <button type="submit" className="btn btn-danger btn-block btn-lg">Save</button>
            </form>
          </React.Fragment>
        )
      }
    }

    export default PropertyWidget
