import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import Carroussel from '@src/carroussel';


import { safeCredentials,  safeCredentialsForm, handleErrors } from '@utils/fetchHelper';

import './editproperty.scss';

class Editproperty extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      property: null,
      editable: false,
      propertyTitle: '',
      propertyDescription: '',
      propertyType: '',
      propertyCity: '',
      propertyCountry: '',
      propertyPrice: 0,
      propertyGuests: 0,
      propertyBedrooms: 0,
      propertyBeds: 0,
      propertyBaths: 0,
      propertyWifi: false,
      propertyKitchen: false,
      propertyIron: false,
      propertyTv: false,
      propertyEssentials: false,
      propertyWasher: false,
      propertyHeating: false,
      propertyAir_conditioning: false,
      propertyBathtub: false,
      propertyParking: false,
      propertyMicrowave: false,
      propertyOven: false,
      propertyRefrigerator: false,
      propertyHair_dryer: false,
      propertyBalcony: false,
      propertySmoke_alarm: false,
      propertyFire_extinguisher: false,
      propertyImages: [],
    }
    this.uploadedFile = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.getpropertydetails = this.getpropertydetails.bind(this);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    this.getpropertydetails();

  }

  getpropertydetails() {
    fetch(`/api/properties/${this.props.property_id}`)
      .then(handleErrors)
      .then(data => {
        console.log(data);
        this.setState({
          property: data.property,
        })
      })
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

  delete(image_id) {
    if(!image_id) {
      console.log("cannot delete picture");
    }

    fetch(`/api/property/images/${image_id}`, safeCredentials({
      method: "DELETE",
      mode:"cors",
      headers: { "Content-Type": "application/json" },
    })).then((data) => {
        console.log('success');
        this.getpropertydetails();
        this.edit();
      })
      .catch((error) => {
        console.log('could not delete image');
      })
  }


  edit() {
    this.setState({
      editable: true,
    })

    let editingItem = this.state.property;
    this.setState({
      propertyTitle: editingItem.title,
      propertyDescription: editingItem.description,
      propertyType: editingItem.property_type,
      propertyCity: editingItem.city,
      propertyCountry: editingItem.country,
      propertyPrice: editingItem.price_per_night,
      propertyGuests: editingItem.max_guests,
      propertyBedrooms: editingItem.bedrooms,
      propertyBeds: editingItem.beds,
      propertyBaths: editingItem.baths,
      propertyWifi: editingItem.wifi,
      propertyKitchen: editingItem.kitchen,
      propertyIron: editingItem.iron,
      propertyTv: editingItem.tv,
      propertyEssentials: editingItem.essentials,
      propertyWasher: editingItem.washer,
      propertyHeating: editingItem.heating,
      propertyAir_conditioning: editingItem.air_conditioning,
      propertyBathtub: editingItem.bathtub,
      propertyParking: editingItem.parking,
      propertyMicrowave: editingItem.microwave,
      propertyOven: editingItem.oven,
      propertyRefrigerator: editingItem.refrigerator,
      propertyHair_dryer: editingItem.hair_dryer,
      propertyBalcony: editingItem.balcony,
      propertySmoke_alarm: editingItem.smoke_alarm,
      propertyFire_extinguisher: editingItem.fire_extinguisher,
      propertyImages: editingItem.images,
    })
  }

  save(e) {
    if (e) { e.preventDefault(); };

    let formData = new FormData();
    if (this.uploadedFile.current.files[0] == null) {
     formData.set('property[title]', this.state.propertyTitle);
     formData.set('property[city]', this.state.propertyCity);
     formData.set('property[country]', this.state.propertyCountry);
     formData.set('property[max_guests]', this.state.propertyGuests);
     formData.set('property[property_type]', this.state.propertyType);
     formData.set('property[bedrooms]', this.state.propertyBedrooms);
     formData.set('property[beds]', this.state.propertyBeds);
     formData.set('property[baths]', this.state.propertyBaths);
     formData.set('property[description]', this.state.propertyDescription);
     formData.set('property[price_per_night]', this.state.propertyPrice);
     formData.set('property[wifi]', this.state.propertyWifi);
     formData.set('property[kitchen]', this.state.propertyKitchen);
     formData.set('property[iron]', this.state.propertyIron);
     formData.set('property[tv]', this.state.propertyTv);
     formData.set('property[essentials]', this.state.propertyEssentials);
     formData.set('property[washer]', this.state.propertyWasher);
     formData.set('property[heating]', this.state.propertyHeating);
     formData.set('property[air_conditioning]', this.state.propertyAir_conditioning);
     formData.set('property[bathtub]', this.state.propertyBathtub);
     formData.set('property[parking]', this.state.propertyParking);
     formData.set('property[microwave]', this.state.propertyMicrowave);
     formData.set('property[oven]', this.state.propertyOven);
     formData.set('property[refrigerator]', this.state.propertyRefrigerator);
     formData.set('property[hair_dryer]', this.state.propertyHair_dryer);
     formData.set('property[balcony]', this.state.propertyBalcony);
     formData.set('property[smoke_alarm]', this.state.propertySmoke_alarm);
     formData.set('property[fire_extinguisher]', this.state.propertyFire_extinguisher);
   } else {

     for (let i = 0; i < this.uploadedFile.current.files.length; i++) {
       formData.append('property[images][]', this.uploadedFile.current.files[i]);
     }
     formData.set('property[title]', this.state.propertyTitle);
     formData.set('property[city]', this.state.propertyCity);
     formData.set('property[country]', this.state.propertyCountry);
     formData.set('property[max_guests]', this.state.propertyGuests);
     formData.set('property[property_type]', this.state.propertyType);
     formData.set('property[bedrooms]', this.state.propertyBedrooms);
     formData.set('property[beds]', this.state.propertyBeds);
     formData.set('property[baths]', this.state.propertyBaths);
     formData.set('property[description]', this.state.propertyDescription);
     formData.set('property[price_per_night]', this.state.propertyPrice);
     formData.set('property[wifi]', this.state.propertyWifi);
     formData.set('property[kitchen]', this.state.propertyKitchen);
     formData.set('property[iron]', this.state.propertyIron);
     formData.set('property[tv]', this.state.propertyTv);
     formData.set('property[essentials]', this.state.propertyEssentials);
     formData.set('property[washer]', this.state.propertyWasher);
     formData.set('property[heating]', this.state.propertyHeating);
     formData.set('property[air_conditioning]', this.state.propertyAir_conditioning);
     formData.set('property[bathtub]', this.state.propertyBathtub);
     formData.set('property[parking]', this.state.propertyParking);
     formData.set('property[microwave]', this.state.propertyMicrowave);
     formData.set('property[oven]', this.state.propertyOven);
     formData.set('property[refrigerator]', this.state.propertyRefrigerator);
     formData.set('property[hair_dryer]', this.state.propertyHair_dryer);
     formData.set('property[balcony]', this.state.propertyBalcony);
     formData.set('property[smoke_alarm]', this.state.propertySmoke_alarm);
     formData.set('property[fire_extinguisher]', this.state.propertyFire_extinguisher);
   };

    fetch(`/api/propertyupdate/${this.props.property_id}`, safeCredentialsForm({
        method: 'PUT',
        body: formData,
      }))
        .then(handleErrors)
        .then(data => {
          console.log(data);
          console.log('success!');
          const params = new URLSearchParams(window.location.search);
          const redirect_url = params.get('redirect_url') || '/myproperties';
          window.location = redirect_url;
        })
        .catch(error => {
          this.setState({
            error: 'Could not update property',
          })
        });

        this.setState({
          propertyTitle: '',
          propertyDescription: '',
          propertyType: '',
          propertyCity: '',
          propertyCountry: '',
          propertyPrice: 0,
          propertyGuests: 0,
          propertyBedrooms: 0,
          propertyBeds: 0,
          propertyBaths: 0,
          propertyWifi: false,
          propertyKitchen: false,
          propertyIron: false,
          propertyTv: false,
          propertyEssentials: false,
          propertyWasher: false,
          propertyHeating: false,
          propertyAir_conditioning: false,
          propertyBathtub: false,
          propertyParking: false,
          propertyMicrowave: false,
          propertyOven: false,
          propertyRefrigerator: false,
          propertyHair_dryer: false,
          propertyBalcony: false,
          propertySmoke_alarm: false,
          propertyFire_extinguisher: false,
        });

       document.getElementById("images").value = null;
  }

  render () {
    const { property, editable, propertyTitle, propertyDescription, propertyType, propertyCity, propertyCountry, propertyPrice, propertyGuests, propertyBedrooms, propertyBeds, propertyBaths, propertyWifi, propertyKitchen, propertyIron, propertyTv, propertyEssentials, propertyWasher, propertyHeating, propertyAir_conditioning, propertyBathtub, propertyParking, propertyMicrowave, propertyOven, propertyRefrigerator, propertyHair_dryer, propertyBalcony, propertySmoke_alarm, propertyFire_extinguisher } = this.state;

    if (!property) {
      return null;
    }

    const { title, description, city, country, property_type, price_per_night, max_guests, bedrooms, beds, baths, images } = property;

    return (
      <Layout >
        <div className="container ">
          <div className="row">
            <div className="col-12">
              <div className="title text-center text-danger mt-4 mb-5"><b> Property Details</b>
              </div>
              {!editable ?
                <div>
                  <p><b>Photos:</b></p>
                  <div className="col mb-4 property">
                    <Carroussel images={images}/>
                  </div>
                  <p><b>Property Title:</b> {title} </p>
                  <p><b>Property Description:</b> {description} </p>
                  <p><b>Property City:</b> {city} </p>
                  <p><b>Property Country:</b> {country} </p>
                  <p><b>Property Property Type:</b> {property_type} </p>
                  <p><b>Property Price:</b> US$ {price_per_night} / night </p>
                  <p><b>Property Max Guests:</b> {max_guests} </p>
                  <p><b>Property Bedrooms:</b> {bedrooms} </p>
                  <p><b>Property Beds:</b> {beds} </p>
                  <p><b>Property Baths:</b> {baths} </p>

                  <div><b>Amenities</b></div>
                  <div className="row">
                    <div className="col-12 col-md-4">
                      {property.wifi ? <p className="text-currency">Wifi <i className="fa fa-check text-success"></i></p> : <p className="text-currency">Wifi <i className="fa fa-times text-danger"></i></p>}
                    </div>
                    <div className="col-12 col-md-4">
                      {property.kitchen ? <p className="text-currency">Kitchen <i className="fa fa-check text-success"></i></p> : <p className="text-currency">Kitchen <i className="fa fa-times text-danger"></i></p>}
                    </div>
                    <div className="col-12 col-md-4">
                      {property.iron ? <p className="text-currency">Iron <i className="fa fa-check text-success"></i></p> : <p className="text-currency">Iron <i className="fa fa-times text-danger"></i></p>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-4">
                      {property.tv ? <p className="text-currency">TV <i className="fa fa-check text-success"></i></p> : <p className="text-currency">TV <i className="fa fa-times text-danger"></i></p>}
                    </div>
                    <div className="col-12 col-md-4">
                      {property.essentials ? <p className="text-currency">Essentials <i className="fa fa-check text-success"></i></p> : <p className="text-currency">Essentials <i className="fa fa-times text-danger"></i></p>}
                    </div>
                    <div className="col-12 col-md-4">
                      {property.washer ? <p className="text-currency">Washer <i className="fa fa-check text-success"></i></p> : <p className="text-currency">Washer <i className="fa fa-times text-danger"></i></p>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-4">
                      {property.heating ? <p className="text-currency">Heating <i className="fa fa-check text-success"></i></p> : <p className="text-currency">Heating <i className="fa fa-times text-danger"></i></p>}
                    </div>
                    <div className="col-12 col-md-4">
                      {property.bathtub ? <p className="text-currency">WifiBathtub <i className="fa fa-check text-success"></i></p> : <p className="text-currency">Bathtub <i className="fa fa-times text-danger"></i></p>}
                    </div>
                    <div className="col-12 col-md-4">
                      {property.parking ? <p className="text-currency">Parking <i className="fa fa-check text-success"></i></p> : <p className="text-currency">Parking <i className="fa fa-times text-danger"></i></p>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-4">
                      {property.microwave ? <p className="text-currency">Microwave <i className="fa fa-check text-success"></i></p> : <p className="text-currency">Microwave <i className="fa fa-times text-danger"></i></p>}
                    </div>
                    <div className="col-12 col-md-4">
                      {property.refrigerator ? <p className="text-currency">Refrigerator <i className="fa fa-check text-success"></i></p> : <p className="text-currency">Refrigerator <i className="fa fa-times text-danger"></i></p>}
                    </div>
                    <div className="col-12 col-md-4">
                      {property.oven ? <p className="text-currency">Oven <i className="fa fa-check text-success"></i></p> : <p className="text-currency">Oven <i className="fa fa-times text-danger"></i></p>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-4">
                      {property.hair_dryer ? <p className="text-currency">Hair Dryer <i className="fa fa-check text-success"></i></p> : <p className="text-currency">Hair Dryer <i className="fa fa-times text-danger"></i></p>}
                    </div>
                    <div className="col-12 col-md-4">
                      {property.balcony ? <p className="text-currency">Balcony <i className="fa fa-check text-success"></i></p> : <p className="text-currency">Balcony <i className="fa fa-times text-danger"></i></p>}
                    </div>
                    <div className="col-12 col-md-4">
                      {property.smoke_alarm ? <p className="text-currency">Smoke Alarm <i className="fa fa-check text-success"></i></p> : <p className="text-currency">Smoke Alarm <i className="fa fa-times text-danger"></i></p>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-4">
                      {property.fire_extinguisher ? <p className="text-currency">Fire Extinguisher <i className="fa fa-check text-success"></i></p> : <p className="text-currency">Fire Extinguisher <i className="fa fa-times text-danger"></i></p>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-4">
                      {property.air_conditioning ? <p className="text-currency">Air Conditioning <i className="fa fa-check text-success"></i></p> : <p className="text-currency">Air Conditioning<i className="fa fa-times text-danger"></i></p>}
                    </div>
                  </div>

                  <button type="button" className="btn btn-sm btn-danger mx-1 my-1" onClick={() => this.edit()}>Edit</button>
                </div>
                :
                <div>
                  <div><b>Current Photos:</b></div>
                  <div className="row">
                    {images.map((image) => {
                      return(
                        <div className="col-4 my-2 property" key={image.image_url}>
                          <div className="property-image" style={{ backgroundImage: `url(${image.image_url})`}}/>
                          <i type="button" onClick={() => this.delete(image.image_id)} className="fa fa-times-circle text-danger"></i>
                        </div>
                      );
                    })}
                  </div>

                  <form onSubmit={this.save}>
                    <div className="form-group mt-2">
                      <label id="upload-image-btn" htmlFor="images"><b>Upload New Images:</b></label>
                      <br/>
                      <input type="file" id="images" name="images" accept="images/*" ref={this.uploadedFile} multiple/>
                    </div>

                    <div className="form-group">
                      <label htmlFor="propertyTitle"><b>Property Title</b></label>
                      <input onChange={this.handleChange} name="propertyTitle" type="text" placeholder="Property Title" defaultValue={propertyTitle} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="propertyTitle"><b>Property Description</b></label>
                      <input onChange={this.handleChange} name="propertyDescription" type="text" placeholder="Property Description" defaultValue={propertyDescription} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="propertyCity"><b>City</b></label>
                      <input onChange={this.handleChange} name="propertyCity" type="text" placeholder="City" defaultValue={propertyCity} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="propertyTitle"><b>Country</b></label>
                      <input onChange={this.handleChange} name="propertyCountry" type="text" placeholder="Country" defaultValue={propertyCountry} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="propertyType"><b>Property Type</b></label>
                      <input onChange={this.handleChange} name="propertyType" type="text" placeholder="Property Type" defaultValue={propertyType} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="propertyPrice"><b>Price Per Night</b></label>
                      <input onChange={this.handleChange} name="propertyPrice" type="text" placeholder="Price per night" defaultValue={propertyPrice} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="propertyGuests"><b>Maximum Guest</b></label>
                      <input onChange={this.handleChange} name="propertyGuests" type="text" placeholder="Maximum Guests" defaultValue={propertyGuests} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="propertyBedrooms"><b>Bedrooms</b></label>
                      <input onChange={this.handleChange} name="propertyBedrooms" type="text" placeholder="Bedrooms" defaultValue={propertyBedrooms} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="propertyBeds"><b>Beds</b></label>
                      <input onChange={this.handleChange} name="propertyBeds" type="text" placeholder="Beds" defaultValue={propertyBeds} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="propertyBaths"><b>Baths</b></label>
                      <input onChange={this.handleChange} name="propertyBaths" type="text" placeholder="Baths" defaultValue={propertyBaths} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="propertyBaths"><b>Baths</b></label>
                      <input onChange={this.handleChange} name="propertyBaths" type="text" placeholder="Baths" defaultValue={propertyBaths} required />
                    </div>

                    <div><b>Amenities</b></div>
                      <div className="row">
                        <div className="col-12 col-md-4">
                          <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" name="propertyWifi" id="propertyWifi" onChange={this.handleCheckChange} defaultChecked={propertyWifi}/>
                            <label className="form-check-label" htmlFor="propertyWifi">Wifi</label>
                          </div>
                        </div>
                        <div className="col-12 col-md-4">
                          <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" name="propertyKitchen" id="propertyKitchen" onChange={this.handleCheckChange} defaultChecked={propertyKitchen}/>
                            <label className="form-check-label" htmlFor="propertyKitchen">Kitchen</label>
                          </div>
                        </div>
                        <div className="col-12 col-md-4">
                          <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" name="propertyIron" id="propertyIron" onChange={this.handleCheckChange} defaultChecked={propertyIron}/>
                            <label className="form-check-label" htmlFor="propertyIron" >Iron</label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-4">
                          <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" name="propertyTv" id="propertyTv" onChange={this.handleCheckChange} defaultChecked={propertyTv}/>
                            <label className="form-check-label" htmlFor="propertyTv">TV</label>
                          </div>
                        </div>
                        <div className="col-12 col-md-4">
                          <div className="form-group form-check">
                          <input type="checkbox" className="form-check-input" name="propertyEssentials" id="propertyEssentials" onChange={this.handleCheckChange}  defaultChecked={propertyEssentials}/>
                            <label className="form-check-label" htmlFor="propertyEssentials">Essentials</label>
                          </div>
                        </div>
                        <div className="col-12 col-md-4">
                          <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" name="propertyWasher" id="propertyWasher" onChange={this.handleCheckChange} defaultChecked={propertyWasher}/>
                            <label className="form-check-label" htmlFor="propertyWasher">Washer</label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-4">
                          <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" name="propertyHeating" id="propertyHeating" onChange={this.handleCheckChange} defaultChecked={propertyHeating}/>
                            <label className="form-check-label" htmlFor="propertyHeating">Heating</label>
                          </div>
                        </div>
                        <div className="col-12 col-md-4">
                          <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" name="propertyBathtub" id="propertyBathtub" onChange={this.handleCheckChange} defaultChecked={propertyBathtub} />
                            <label className="form-check-label" htmlFor="propertyBathtub">Bathtub</label>
                          </div>
                        </div>
                        <div className="col-12 col-md-4">
                          <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" name="propertyParking" id="propertyParking" onChange={this.handleCheckChange} defaultChecked={propertyParking}/>
                            <label className="form-check-label" htmlFor="propertyParking">Parking</label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-4">
                          <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" name="propertyMicrowave" id="propertyMicrowave" onChange={this.handleCheckChange} defaultChecked={propertyMicrowave}/>
                            <label className="form-check-label" htmlFor="propertyMicrowave">Microwave</label>
                          </div>
                        </div>
                        <div className="col-12 col-md-4">
                          <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" name="propertyRefrigerator" id="propertyRefrigerator" onChange={this.handleCheckChange} defaultChecked={propertyRefrigerator}/>
                            <label className="form-check-label" htmlFor="propertyRefrigerator">Refrigerator</label>
                          </div>
                        </div>
                        <div className="col-12 col-md-4">
                          <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" name="propertyOven" id="propertyOven" onChange={this.handleCheckChange} defaultChecked={propertyOven}/>
                            <label className="form-check-label" htmlFor="propertyOven">Oven</label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-4">
                          <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" name="propertyHair_dryer" id="propertyHair_dryer" onChange={this.handleCheckChange} defaultChecked={propertyHair_dryer}/>
                            <label className="form-check-label" htmlFor="propertyHair_dryer">Hair dryer</label>
                          </div>
                        </div>
                        <div className="col-12 col-md-4">
                          <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" name="propertyBalcony" id="propertyBalcony" onChange={this.handleCheckChange} defaultChecked={propertyBalcony}/>
                            <label className="form-check-label" htmlFor="propertyBalcony">Balcony</label>
                          </div>
                        </div>
                        <div className="col-12 col-md-4">
                          <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" name="propertySmoke_alarm" id="propertySmoke_alarm" onChange={this.handleCheckChange} defaultChecked={propertySmoke_alarm}/>
                            <label className="form-check-label" htmlFor="propertySmoke_alarm">Smoke alarm</label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-4">
                          <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" name="propertyFire_extinguisher" id="propertyFire_extinguisher" onChange={this.handleCheckChange} defaultChecked={propertyFire_extinguisher}/>
                            <label className="form-check-label" htmlFor="propertyFire_extinguisher">Fire extinguisher</label>
                          </div>
                        </div>
                        <div className="col-12 col-md-4">
                          <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" name="propertyAir_conditioning" id="propertyAir_conditioning" onChange={this.handleCheckChange} defaultChecked={propertyAir_conditioning}/>
                            <label className="form-check-label" htmlFor="propertyAir_conditioning">Air Conditioning</label>
                          </div>
                        </div>
                      </div>

                    <button type="submit" className="btn btn-danger btn-block btn-lg">Save</button>
                  </form>

                </div>
                }

            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Editproperty;
