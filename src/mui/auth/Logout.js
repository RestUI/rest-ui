import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push as pushAction } from 'react-router-redux';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import MenuItem from 'material-ui/MenuItem';
import ExitIcon from 'material-ui/svg-icons/action/power-settings-new';

import { translate } from '../../i18n';
import { AUTH_LOGOUT } from '../../auth';

class Logout extends Component {
    handleLogout = () => {
        const { authClient, push } = this.props;
        authClient(AUTH_LOGOUT)
            .then(() => push('/login'));
    }
    render() {
        const { authClient, translate } = this.props;
        return authClient
         ? <MenuItem leftIcon={<ExitIcon />} primaryText={translate('aor.auth.logout')} onClick={this.handleLogout} />
         : null;
    }
}

Logout.propTypes = {
    authClient: PropTypes.func,
    push: PropTypes.func,
    translate: PropTypes.func,
};

const enhance = compose(
    translate,
    connect(null, { push: pushAction }),
);

export default enhance(Logout);
