import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Stats, SortBy } from 'react-instantsearch-dom';
import 'instantsearch.css/themes/reset.css';

import './home.scss';

const searchClient = algoliasearch(
  '3X7ZH30LZH',
  '700f513795d50cd575c0713e9ed25bac'
);

const Hit = ({hit}) => (
  <div className="col-6 col-lg-4 mb-4 property">
    <a href={`/property/${hit.objectID}`} className="text-body text-decoration-none">
      <img src={hit.images[0].image_url} />
      <p className="text-uppercase mb-0 text-secondary"><small><b>{hit.city}</b></small></p>
      <h6 className="mb-0">{hit.title}</h6>
      <p className="mb-0"><small>${hit.price_per_night} USD/night</small></p>
    </a>
  </div>
);

const Search = () => (
  <InstantSearch indexName="Property" searchClient={searchClient} >
    <SearchBox translations={{placeholder:'Search for places ...'}}/>
    <div>
      <Stats />
      <SortBy defaultRefinement="Property" items={[
        {value:'Property', label: 'Most Relevant'},
        {value:'Property_price_asc', label: 'Lowest Price'},
        {value:'Property_price_desc', label: 'Highest Price'},
      ]} />
    </div>
    <Hits hitComponent={Hit}/>
  </InstantSearch>
);


class Home extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        properties: [],
        total_pages: null,
        next_page: null,
        loading: true,
        searchInput: '',
        keywords: '',
      }
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    fetch('/api/properties?page=1')
      .then(handleErrors)
      .then(data => {
        console.log(data);
        this.setState({
          properties: data.properties,
          total_pages: data.total_pages,
          next_page: data.next_page,
          loading: false,
        })
      })
    }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  submit (e) {
    e.preventDefault();
    this.setState({ loading: true });

    fetch(`/api/properties/search/${this.state.searchInput}`)
      .then(handleErrors)
      .then(data => {
        console.log(data);
        this.setState({
          properties: data.properties,
          total_pages: data.total_pages,
          next_page: data.next_page,
          loading: false,
        })
      })

      this.setState({
        searchInput: '',
      })
  }

  loadMore = () => {
      if (this.state.next_page === null) {
        return;
      }
      this.setState({ loading: true });
      fetch(`/api/properties?page=${this.state.next_page}`)
        .then(handleErrors)
        .then(data => {
          this.setState({
            properties: this.state.properties.concat(data.properties),
            total_pages: data.total_pages,
            next_page: data.next_page,
            loading: false,
          })
        })
    }

  render () {
    const { properties, total_pages, next_page, loading, searchInput, keywords } = this.state;

    return (
      <Layout>
        <div className="container pt-4">
          <div>
            <Search />
          </div>



          <div className="search-bar col-xs-3 mb-3">
            <form className="input-group" onSubmit={this.submit}>
                <input type="text" className="form-control search-input" placeholder="Search for..." onChange={this.handleChange} name="searchInput" value={searchInput} required/>
                <span className="input-group-btn">
                  <button className="btn btn-danger search-btn mx-1" type="submit">Search</button>
                </span>
              </form>
          </div>

          <h4 className="mb-1">Top-rated places to stay</h4>
          <p className="text-secondary mb-3">Explore some of the best-reviewed stays in the world</p>
          <div className="row">
            {properties.length > 0 ? properties.map((property) => {
              return (
                <div key={property.id} className="col-6 col-lg-4 mb-4 property">
                  <a href={`/property/${property.id}`} className="text-body text-decoration-none">
                    <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.images[0].image_url})` }} />
                    <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
                    <h6 className="mb-0">{property.title}</h6>
                    <p className="mb-0"><small>${property.price_per_night} USD/night</small></p>
                    </a>
                  </div>
                );
              }) : <p>No listed properties</p>}
            </div>
            {loading && <p>loading...</p>}
            {(loading || next_page === null) ||
            <div className="text-center">
              <button
                className="btn btn-light mb-4"
                onClick={this.loadMore}
              >load more</button>
            </div>
          }
          </div>
        </Layout>
      )
    }
  }

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
