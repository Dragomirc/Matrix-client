/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/static-property-placement */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

const isUserAdmin = ChildComponent => {
    class IsAdmin extends Component {
        static displayName = `isAdmin(${ChildComponent.displayName ||
            Component.name ||
            "Component"})`;

        static fetchData(options) {
            return ChildComponent.fetchData
                ? ChildComponent.fetchData(options)
                : null;
        }

        render() {
            const { isAdmin } = this.props;
            switch (isAdmin) {
                case false:
                    return <Redirect to="/login" />;
                default:
                    return <ChildComponent {...this.props} />;
            }
        }
    }

    IsAdmin.propTypes = {
        isAdmin: PropTypes.bool.isRequired
    };

    const mapStateToProps = ({ user }) => ({ isAdmin: user.admin });
    return connect(mapStateToProps)(IsAdmin);
};

export default isUserAdmin;
