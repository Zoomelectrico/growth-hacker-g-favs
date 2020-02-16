import React from 'react';
import PropTypes from 'prop-types';
import formatPrice from '../lib/formatPrice';

const Item = ({ photo, brand, model, price, canLike = false, isLiked = false }) => {
  const [liked, setLiked] = React.useState(isLiked);
  React.useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);
  const onClick = e => {
    e.preventDefault();
    setLiked(!liked);
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
            <button type="button" className="btn bg-transparent my-auto p-0" onClick={onClick}>
              <i className={`${liked ? 'fas text-danger' : 'far'} fa-heart my-auto`} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {
  photo: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  brand: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  canLike: PropTypes.bool,
  isLiked: PropTypes.bool,
};

Item.defaultProps = {
  canLike: false,
  isLiked: false,
};

export default Item;
