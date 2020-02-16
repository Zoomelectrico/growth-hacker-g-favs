import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Item from './Item';
import Filter from './Filter';

const Items = ({ items, title, pageInfo, page, link, auth, add, remove, fav }) => {
  const [_items, setItems] = React.useState([]);
  React.useEffect(() => {
    if (fav && fav.length) {
      setItems(
        items.map(item => {
          const [_item] = fav.filter(({ _id }) => String(_id) === String(item._id));
          if (_item) {
            return { ...item, isLiked: true };
          }
          return { ...item, isLiked: false };
        })
      );
    } else {
      setItems(items);
    }
  }, [fav, items]);
  const getSort = (field, up) => {
    const __items = items.sort((a, b) => {
      if (up) {
        if (typeof a[field] === 'number') {
          return Number(b[field]) - Number(a[field]);
        }
        return b[field] > a[field] ? 1 : -1;
      }
      if (typeof a[field] === 'number') {
        return Number(b[field]) - Number(a[field]);
      }
      return b[field] < a[field] ? 1 : -1;
    });
  };
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center mb-3">List of {title}</h2>
        </div>
        <div className="col-12 d-flex">{/*  */}</div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-3">
          <Filter type={String(title).toLowerCase()} getSort={getSort} />
        </div>
        <div className="col-12 col-lg-9">
          <div className="row">
            {_items.map(item => (
              <div className="col-10 col-md-8 col-lg-4 mb-3 offset-1 offset-md-2 offset-lg-0" key={item._id}>
                <Item {...item} canLike={auth} add={add} remove={remove} />
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
                  <Link href={`/${link}/[page]`} as={`/${link}/${page - 1}`}>
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
};

Items.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  pageInfo: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  link: PropTypes.string,
  auth: PropTypes.bool.isRequired,
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  fav: PropTypes.array,
};

Items.defaultProps = {
  link: 'items',
  fav: [],
};

export default Items;
