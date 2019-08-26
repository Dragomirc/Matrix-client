import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import Header from 'app/components/header';

const App = ({ route }) => (
    <>
        <Header />
        {renderRoutes(route.routes)}
    </>
);

App.propTypes = {
    route: PropTypes.object.isRequired
};
export default App;
