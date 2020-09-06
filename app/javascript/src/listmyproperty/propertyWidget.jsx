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
      wifi: false,
      kitchen: false,
      iron: false,
      tv: false,
      essentials: false,
      washer: false,
      heating: false,
      air_conditioning: false,
      bathtub: false,
      parking: false,
      microwave: false,
      oven: false,
      refrigerator: false,
      hair_dryer: false,
      balcony: false,
      smoke_alarm: false,
      fire_extinguisher: false,
    }
    this.uploadedFile = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.createProperty = this.createProperty.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleCheckChange(e) {
    let checked = e.target.checked;
    this.setState({
      [e.target.name]: checked,
    })
    console.log(checked);
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
     formData.set('property[wifi]', this.state.wifi);
     formData.set('property[kitchen]', this.state.kitchen);
     formData.set('property[iron]', this.state.iron);
     formData.set('property[tv]', this.state.tv);
     formData.set('property[essentials]', this.state.essentials);
     formData.set('property[washer]', this.state.washer);
     formData.set('property[heating]', this.state.heating);
     formData.set('property[air_conditioning]', this.state.air_conditioning);
     formData.set('property[bathtub]', this.state.bathtub);
     formData.set('property[parking]', this.state.parking);
     formData.set('property[microwave]', this.state.microwave);
     formData.set('property[oven]', this.state.oven);
     formData.set('property[refrigerator]', this.state.refrigerator);
     formData.set('property[hair_dryer]', this.state.hair_dryer);
     formData.set('property[balcony]', this.state.balcony);
     formData.set('property[smoke_alarm]', this.state.smoke_alarm);
     formData.set('property[fire_extinguisher]', this.state.fire_extinguisher);
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
     formData.set('property[wifi]', this.state.wifi);
     formData.set('property[kitchen]', this.state.kitchen);
     formData.set('property[iron]', this.state.iron);
     formData.set('property[tv]', this.state.tv);
     formData.set('property[essentials]', this.state.essentials);
     formData.set('property[washer]', this.state.washer);
     formData.set('property[heating]', this.state.heating);
     formData.set('property[air_conditioning]', this.state.air_conditioning);
     formData.set('property[bathtub]', this.state.bathtub);
     formData.set('property[parking]', this.state.parking);
     formData.set('property[microwave]', this.state.microwave);
     formData.set('property[oven]', this.state.oven);
     formData.set('property[refrigerator]', this.state.refrigerator);
     formData.set('property[hair_dryer]', this.state.hair_dryer);
     formData.set('property[balcony]', this.state.balcony);
     formData.set('property[smoke_alarm]', this.state.smoke_alarm);
     formData.set('property[fire_extinguisher]', this.state.fire_extinguisher);
   };

    fetch('/api/properties', safeCredentialsForm({
        method: 'POST',
        body: formData,
      }))
        .then(handleErrors)
        .then(data => {
          console.log(data);
          console.log('success!');
          const params = new URLSearchParams(window.location.search);
          const redirect_url = params.get('redirect_url') || `/property/${data.property.id}/success`;
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
        wifi: false,
        kitchen: false,
        iron: false,
        tv: false,
        essentials: false,
        washer: false,
        heating: false,
        air_conditioning: false,
        bathtub: false,
        parking: false,
        microwave: false,
        oven: false,
        refrigerator: false,
        hair_dryer: false,
        balcony: false,
        smoke_alarm: false,
        fire_extinguisher: false,
      });

     document.getElementById("images").value = null;
  }

    render () {
        const { title, city, country, max_guests, property_type, bedrooms, beds, baths, description, price_per_night, wifi, kitchen, iron, tv, essentials, washer, heating, air_conditioning, bathtub, parking, microwave, oven, refrigerator, hair_dryer, balcony, smoke_alarm, fire_extinguisher } = this.state;

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
                <select name="property_type" className="form-control" value={property_type} placeholder="Property type" onChange={this.handleChange} id="property_type">
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
              <div><b>Amenities</b></div>
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" name="wifi" id="wifi" onChange={this.handleCheckChange} />
                      <label className="form-check-label" htmlFor="wifi">Wifi</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" name="kitchen" id="kitchen" onChange={this.handleCheckChange} />
                      <label className="form-check-label" htmlFor="kitchen">Kitchen</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" name="iron" id="iron" onChange={this.handleCheckChange} />
                      <label className="form-check-label" htmlFor="iron">Iron</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" name="tv" id="tv" onChange={this.handleCheckChange} />
                      <label className="form-check-label" htmlFor="tv">TV</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" name="essentials" id="essentials" onChange={this.handleCheckChange} />
                      <label className="form-check-label" htmlFor="essentials">Essentials</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" name="washer" id="washer" onChange={this.handleCheckChange} />
                      <label className="form-check-label" htmlFor="washer">Washer</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" name="heating" id="heating" onChange={this.handleCheckChange} />
                      <label className="form-check-label" htmlFor="heating">Heating</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" name="bathtub" id="bathtub" onChange={this.handleCheckChange} />
                      <label className="form-check-label" htmlFor="bathtub">Bathtub</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" name="parking" id="parking" onChange={this.handleCheckChange} />
                      <label className="form-check-label" htmlFor="parking">Parking</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" name="microwave" id="microwave" onChange={this.handleCheckChange} />
                      <label className="form-check-label" htmlFor="microwave">Microwave</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" name="refrigerator" id="refrigerator" onChange={this.handleCheckChange} />
                      <label className="form-check-label" htmlFor="refrigerator">Refrigerator</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" name="oven" id="oven" onChange={this.handleCheckChange} />
                      <label className="form-check-label" htmlFor="oven">Oven</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" name="hair_dryer" id="hair_dryer" onChange={this.handleCheckChange} />
                      <label className="form-check-label" htmlFor="hair_dryer">Hair dryer</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" name="balcony" id="balcony" onChange={this.handleCheckChange} />
                      <label className="form-check-label" htmlFor="balcony">Balcony</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" name="smoke_alarm" id="smoke_alarm" onChange={this.handleCheckChange} />
                      <label className="form-check-label" htmlFor="smoke_alarm">Smoke alarm</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" name="fire_extinguisher" id="fire_extinguisher" onChange={this.handleCheckChange} />
                      <label className="form-check-label" htmlFor="fire_extinguisher">Fire extinguisher</label>
                    </div>
                  </div>
                </div>

              <button type="submit" className="btn btn-danger btn-block btn-lg">Save</button>
            </form>
          </React.Fragment>
        )
      }
    }

    export default PropertyWidget
