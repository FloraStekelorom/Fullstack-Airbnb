// property.jsx
import React from 'react';
import Layout from '@src/layout';
import BookingWidget from './bookingWidget';
import Carroussel from '@src/carroussel';

import { handleErrors } from '@utils/fetchHelper';

import './property.scss';

class Property extends React.Component {
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

    const {
      id,
      title,
      description,
      city,
      country,
      property_type,
      price_per_night,
      max_guests,
      bedrooms,
      beds,
      baths,
      images,
      user,
      wifi,
      kitchen,
      iron,
      tv,
      essentials,
      washer,
      heating,
      air_conditioning,
      bathtub,
      parking,
      microwave,
      oven,
      refrigerator,
      hair_dryer,
      balcony,
      smoke_alarm,
      fire_extinguisher,
    } = property

    return (
      <Layout>

        <Carroussel images={images}/>

        <div className="mt-4 container">
          <div className="row">
            <div className="info col-12 col-lg-8">
              <div className="mb-3">
                <h3 className="mb-0">{title}</h3>
                <p className="text-uppercase mb-0 text-secondary"><small>{city}</small></p>
                <p className="mb-0"><small>Hosted by <b>{user.username}</b></small></p>
              </div>
              <div>
                <p className="mb-0 text-capitalize"><b>{property_type}</b></p>
                <p>
                  <span className="mr-3">{max_guests} guests</span>
                  <span className="mr-3">{bedrooms} bedroom</span>
                  <span className="mr-3">{beds} bed</span>
                  <span className="mr-3">{baths} bath</span>
                </p>
              </div>
              <hr />
              <p>{description}</p>
            </div>
            <div>
              <p><b>Amenities</b></p>
              { wifi ? <p>Wifi</p> : <p></p>}
              { kitchen ? <p>Kitchen</p> : <p></p>}
              { iron ? <p>Iron</p> : <p></p>}
              { tv ? <p>TV</p> : <p></p>}
              { essentials ? <p>Essentials</p> : <p></p>}
              { washer ? <p>Washer</p> : <p></p>}
              { heating ? <p>Heating</p> : <p></p>}
              { air_conditioning ? <p>Air conditioning</p> : <p></p>}
              { bathtub ? <p>Bathtub</p> : <p></p>}
              { parking ? <p>Parking</p> : <p></p>}
              { microwave ? <p>Microwave</p> : <p></p>}
              { oven ? <p>Oven</p> : <p></p>}
              { refrigerator ? <p>Refrigerator</p> : <p></p>}
              { hair_dryer ? <p>Hair Dryer</p> : <p></p>}
              { balcony ? <p>Balcony</p> : <p></p>}
              { smoke_alarm ? <p>Smoke alarm</p> : <p></p>}
              { fire_extinguisher ? <p>Fire extinguisher</p> : <p></p>}
            </div>
            <div className="col-12 col-lg-5">
              <BookingWidget property_id={id} price_per_night={price_per_night} />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Property
