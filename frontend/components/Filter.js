import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { GET_FIELDS } from '../graphql/queries';
import uuid from '../lib/uuid';

const Filter = ({ type, getSort }) => {
  const { data, loading, error } = useQuery(GET_FIELDS);
  const [fields, setFields] = React.useState([]);
  const [field, setField] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState('');
  const search = e => {
    e.preventDefault();
    // TODO: Search!
  };

  const sort = (e, _field, up) => {
    e.preventDefault();
    getSort(_field, up);
  };

  const onClick = (e, id) => {
    e.preventDefault();
    if (field === id) {
      setField(null);
    } else {
      setField(id);
    }
  };
  React.useEffect(() => {
    if (data) {
      const keys = Object.keys(data);
      keys.forEach(key => {
        if (type.includes(key)) {
          setFields(
            data[key].fields
              .map(({ name }) => ({ name, id: uuid() }))
              .filter(x => x.name !== '_id' && x.name !== 'photo')
          );
        }
      });
    }
  }, [type, data]);
  return (
    <div className="row">
      <div className="col-12">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {field && (
              <div className="form-group">
                <label htmlFor="search-field">Search</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    name="search-field"
                    id="search-field"
                    className="form-control"
                    placeholder="Search Value"
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-outline-primary" type="button" onClick={search}>
                      Search
                    </button>
                  </div>
                </div>
              </div>
            )}
            <ul className="list-group list-group-flush">
              {fields.map(_field => (
                <li className="list-group-item" key={_field.id}>
                  <div className="d-flex">
                    <button
                      type="button"
                      className="btn bg-transparent h-100 p-0 text-left mr-auto"
                      onClick={e => onClick(e, _field.id)}
                    >
                      {_field.name}
                    </button>
                    <button
                      type="button"
                      className="btn bg-transparent h-100 p-0 text-center"
                      onClick={e => sort(e, _field.name, true)}
                    >
                      <i className="fas fa-arrow-up" />
                    </button>
                    <button
                      type="button"
                      className="btn bg-transparent h-100 p-0 text-center"
                      onClick={e => sort(e, _field.name, false)}
                    >
                      <i className="fas fa-arrow-down" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

Filter.propTypes = {
  type: PropTypes.string.isRequired,
  getSort: PropTypes.func.isRequired,
};

export default Filter;
