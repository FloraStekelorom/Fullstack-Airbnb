import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';

import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './propertysuccess.scss';

class Propertysuccess extends React.Component {

  render () {

    return (
      <Layout >
        <div className="container text-center">
          <i className="fa fa-check-circle text-danger text-center"></i>
          <div className="row">
            <div className="col-12">
              <div>Your property <b>property.title</b> is now live!</div>
              <div className="my-2">Add Property Details</div>
            </div>
            <div className="col-12">
              <div className="property-image my-2 rounded">Add images here</div>
            </div>
            <div className="col-12">
              <a role="button" href="#" className="btn btn-danger my-3">See all my properties</a>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
export default Propertysuccess;
