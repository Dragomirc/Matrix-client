import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import classnames from 'classnames';
import ProductService from 'app/services/api/product';
import styles from './styles.scss';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      price: ''
    };
  }

  onInputChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  onSubmit = event => {
    event.preventDefault();
    ProductService.createProduct(this.state);
  };

  render() {
    const { title, description, price } = this.state;
    return (
      <Form
        className={classnames(styles.form, 'mx-auto mt-3')}
        onSubmit={this.onSubmit}
      >
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={this.onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="picture">Picture</Label>
          <Input
            name="picture"
            id="picture"
            type="file"
            onChange={this.onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            id="description"
            name="description"
            type="textarea"
            value={description}
            onChange={this.onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={price}
            onChange={this.onInputChange}
          />
        </FormGroup>
        <Button className="w-100">Add Product</Button>
      </Form>
    );
  }
}

export default AddProduct;
