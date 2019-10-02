import React, { Component } from "react";
import PropTypes from "prop-types";
import openSocket from "socket.io-client";
import { connect } from "react-redux";
import {
    getProducts,
    socketUpdateProduct,
    socketCreateProduct,
    socketDeleteProduct
} from "app/redux/actions/product";
import { getUserDetails, socketUpdateCart } from "app/redux/actions/user";
import { renderRoutes } from "react-router-config";
import Header from "app/components/header";
import Config from "app/config/client";

class App extends Component {
    static async fetchData({ store, cookies }) {
        if (cookies.accessToken) {
            await store.dispatch(getUserDetails(cookies.accessToken));
        }
        return store.dispatch(getProducts());
    }

    componentDidMount() {
        const { isAdmin } = this.props;
        if (!isAdmin) {
            Config.fetch().then(config => {
                const socket = openSocket(`${config.services.proxy}`);
                socket.on("product", data => {
                    const { action, product } = data;
                    const {
                        socketUpdateProductConnect,
                        socketCreateProductConnect,
                        socketDeleteProductConnect,
                        socketUpdateCartConnect
                    } = this.props;
                    if (action === "create") {
                        socketCreateProductConnect(product);
                    } else if (action === "update") {
                        socketUpdateProductConnect(product);
                        socketUpdateCartConnect(data);
                    } else if (action === "delete") {
                        socketDeleteProductConnect(product);
                        socketUpdateCartConnect(data);
                    }
                });
            });
        }
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
const mapDispatchToProps = {
    socketUpdateProductConnect: socketUpdateProduct,
    socketCreateProductConnect: socketCreateProduct,
    socketDeleteProductConnect: socketDeleteProduct,
    socketUpdateCartConnect: socketUpdateCart
};
const mapStateToProps = ({ user }) => ({ isAdmin: user.admin });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

App.propTypes = {
    route: PropTypes.object.isRequired,
    socketUpdateProductConnect: PropTypes.func.isRequired,
    socketCreateProductConnect: PropTypes.func.isRequired,
    socketDeleteProductConnect: PropTypes.func.isRequired,
    socketUpdateCartConnect: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired
};
