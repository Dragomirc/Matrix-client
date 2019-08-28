import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button
} from 'reactstrap';
import classnames from 'classnames';
import styles from './styles.scss';

const ProductCard = props => {
  const { description, title, price, imageUrl } = props;
  return (
    <Card className={classnames(styles.card, 'm-2')}>
      <CardBody>
        <CardTitle className="text-center">{title}</CardTitle>
        <CardImg src={imageUrl} alt="product picture" className="mb-2" />
        <CardText className="text-center">{description}</CardText>
        <CardText className="text-center">{`${price} $`}</CardText>
        <div className="d-flex justify-content-between">
          <Button className="w-100 mr-1">Details</Button>
          <Button className="w-100">Add to Cart</Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
