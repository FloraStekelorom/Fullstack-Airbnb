import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Stats, SortBy } from 'react-instantsearch-dom';
import 'instantsearch.css/themes/algolia.css';

import './home.scss';

const searchClient = algoliasearch(
  '3X7ZH30LZH',
  '700f513795d50cd575c0713e9ed25bac'
);

const Hit = ({hit}) => (
  <div>
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
    <h4 className="mb-1">Top-rated places to stay</h4>
    <p className="text-secondary mb-3">Explore some of the best-reviewed stays in the world</p>
    <SearchBox translations={{placeholder:'Search for places ...'}}/>
    <div id="stats" className="clearfix">
      <Stats />
      <SortBy defaultRefinement="Property" items={[
        {value:'Property', label: 'Most Relevant'},
        {value:'Property_price_asc', label: 'Lowest Price'},
        {value:'Property_price_desc', label: 'Highest Price'},
      ]} />
    </div>
    <div id="hits">
      <Hits hitComponent={Hit}/>
    </div>
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
