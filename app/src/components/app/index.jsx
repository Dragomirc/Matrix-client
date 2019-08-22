import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

const App = ({ route }) => <div>{renderRoutes(route.routes)}</div>;

App.propTypes = {
    route: PropTypes.object.isRequired
};
export default App;
