import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import classnames from 'classnames';
import styles from './styles.scss';

const AddProduct = () => {
  return (
    <Form className={classnames(styles.form, 'mx-auto mt-3')}>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input id="title" name="title" type="text" />
      </FormGroup>
      <FormGroup>
        <Label for="picture">Picture</Label>
        <Input name="picture" id="picture" type="file" />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input id="description" name="description" type="textarea" />
      </FormGroup>
      <FormGroup>
        <Label for="price">Price</Label>
        <Input id="price" name="price" type="number" />
      </FormGroup>
      <Button className="w-100">Add Product</Button>
    </Form>
  );
};

export default AddProduct;
