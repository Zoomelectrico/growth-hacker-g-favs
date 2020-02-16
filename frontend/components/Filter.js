import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { GET_FIELDS } from '../graphql/queries';
import uuid from '../lib/uuid';

const Filter = ({ type }) => {
  const { data, loading, error } = useQuery(GET_FIELDS);
  const [fields, setFields] = React.useState([]);
  const [field, setField] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState('');
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
          setFields(data[key].fields.map(({ name }) => ({ name, id: uuid() })).filter(x => x.name !== '_id'));
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
                <input
                  type="text"
                  name="search-field"
                  id="search-field"
                  className="form-control"
                  placeholder="Search Value"
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                />
              </div>
            )}
            <ul className="list-group list-group-flush">
              {fields.map(_field => (
                <li className="list-group-item" key={_field.id}>
                  <button
                    type="button"
                    className="btn bg-transparent h-100 w-100 p-0 text-left"
                    onClick={e => onClick(e, _field.id)}
                  >
                    {_field.name}
                  </button>
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
};

export default Filter;
