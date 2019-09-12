import React, { Component } from "react";
import PropTypes from "prop-types";
import jwt from "jsonwebtoken";
import { getProducts } from "app/redux/actions/product";
import { authCheckState } from "app/redux/actions/auth";
import { renderRoutes } from "react-router-config";
import Header from "app/components/header";

class App extends Component {
    static async fetchData({ store, cookies }) {
        if (cookies.accessToken) {
            const { userId } = jwt.decode(cookies.accessToken);
            await store.dispatch(authCheckState(userId));
        }
        console.log(jwt.decode(cookies.accessToken));
        return store.dispatch(getProducts());
    }

    render() {
        const { route } = this.props;
        return (
            <>
                <Header />
                {renderRoutes(route.routes)}
            </>
        );
    }
}

App.propTypes = {
    route: PropTypes.object.isRequired
};

export default App;
