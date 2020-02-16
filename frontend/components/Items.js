import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Item from './Item';
import Filter from './Filter';

const Items = ({ items, title, count, pageInfo, page, link, auth }) => (
  <div className="container py-5">
    <div className="row">
      <div className="col-12">
        <h2 className="text-center mb-3">List of {title}</h2>
      </div>
      <div className="col-12 d-flex">{/*  */}</div>
    </div>
    <div className="row">
      <div className="col-12 col-lg-3">
        <Filter type={String(title).toLowerCase()} />
      </div>
      <div className="col-12 col-lg-9">
        <div className="row">
          {items.map(item => (
            <div className="col-10 col-md-8 col-lg-4 mb-3 offset-1 offset-md-2 offset-lg-0" key={item._id}>
              <Item {...item} canLike={auth} />
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="row mt-4">
      <div className="col-12 d-flex justify-content-end">
        <nav>
          <ul className="pagination">
            <li className={`${!pageInfo.hasPreviousPage ? 'disabled' : ''} page-item`}>
              {pageInfo.hasPreviousPage ? (
                <Link href={`/${link}/[page]`} as={`/${link}/${page + 1}`}>
                  <a className="page-link">Previous</a>
                </Link>
              ) : (
                <a className="page-link">Previous</a>
              )}
            </li>
            <li className="page-item active">
              <a className="page-link">{page}</a>
            </li>
            <li className={`${!pageInfo.hasNextPage ? 'disabled' : ''} page-item`}>
              {pageInfo.hasNextPage ? (
                <Link href={`/${link}/[page]`} as={`/${link}/${page + 1}`}>
                  <a className="page-link">Next</a>
                </Link>
              ) : (
                <a className="page-link">Next</a>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
);

Items.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  pageInfo: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  link: PropTypes.string,
  auth: PropTypes.bool.isRequired,
};

Items.defaultProps = {
  link: 'items',
};

export default Items;
