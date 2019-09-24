/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/static-property-placement */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const requireAuth = ChildComponent => {
    class RequireAuth extends Component {
        static displayName = `requireAuth(${ChildComponent.displayName ||
            Component.name ||
            "Component"})`;

        static fetchData(options) {
            return ChildComponent.fetchData
                ? ChildComponent.fetchData(options)
                : null;
        }

        render() {
            const { userId } = this.props;
            switch (userId) {
                case null:
                    return <Redirect to="/login" />;
                default:
                    return <ChildComponent {...this.props} />;
            }
        }
    }

    RequireAuth.propTypes = {
        userId: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    };
    RequireAuth.defaultProps = {
        userId: null
    };
    const mapStateToProps = ({ user }) => ({ userId: user.userId });
    return connect(mapStateToProps)(RequireAuth);
};

export default requireAuth;
