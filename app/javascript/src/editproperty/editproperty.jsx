import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';

import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './editproperty.scss';

class Editproperty extends React.Component {

  render () {

    return (
      <Layout >
        <div className="container ">
          <div className="row">
            <div className="col-12">
              <div className="title text-center text-danger mt-4 mb-5"><b> Property Details</b>
              </div>




            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
export default Editproperty;
