import React from 'react';
import PropTypes from 'prop-types';
import formatPrice from '../lib/formatPrice';
import AppContext from '../AppContext';

const Item = ({ _id, photo, brand, model, price, canLike, isLiked, add, remove }) => {
  const { user } = React.useContext(AppContext);
  const [liked, setLiked] = React.useState(isLiked);
  React.useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);
  const onClick = (e, id) => {
    if (canLike) {
      e.preventDefault();
      if (!isLiked) {
        add(e, user._id, id);
      } else {
        remove(e, user._id, id);
      }
      setLiked(!liked);
    }
  };
  return (
    <div className="card h-100 w-100 border-0 shadow mb-3">
      <img src={photo} alt={model} className="card-img-top" />
      <div className="card-body p-3 d-flex flex-column">
        <h5 className="card-title">
          {brand.name} {model}
        </h5>
        <div className="d-flex justify-content-between mt-auto mb-2">
          <p className="card-text my-auto">$ {formatPrice(price)}</p>
          {canLike && (
            <button type="button" className="btn bg-transparent my-auto p-0" onClick={e => onClick(e, _id)}>
              <i className={`${liked ? 'fas text-danger' : 'far'} fa-heart my-auto`} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {
  _id: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  brand: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  canLike: PropTypes.bool,
  isLiked: PropTypes.bool,
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

Item.defaultProps = {
  canLike: false,
  isLiked: false,
};

export default Item;
