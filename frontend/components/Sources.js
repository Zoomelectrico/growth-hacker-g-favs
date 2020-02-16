/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

const Source = ({ sources, changeSource }) => {
  const onChange = e => {
    e.preventDefault();
    const { value } = e.target;
    changeSource(sources.filter(({ key }) => key === value)[0]);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-7">{/*  */}</div>
        <div className="col-12 col-lg-5">
          <h2 className="text-center text-uppercase">select yours favorites</h2>
          <div className="form-group">
            <label htmlFor="favs" className="sr-only">
              Favorites
            </label>
            <select name="favs" id="favs" className="form-control" defaultValue="none" onChange={onChange}>
              <option disabled value="none">
                Select a source
              </option>
              {sources.map(source => (
                <option key={source.key} value={source.key}>
                  {source.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

Source.propTypes = {
  sources: PropTypes.array.isRequired,
  changeSource: PropTypes.func.isRequired,
};

export default Source;
