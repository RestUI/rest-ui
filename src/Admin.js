import React  from 'react';
import { func, string, node, array, object, oneOfType } from 'prop-types';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, Redirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import withProps from 'recompose/withProps';

import CrudRoute from './CrudRoute';
import DefaultLayout from './mui/layout/Layout';
import Menu from './mui/layout/Menu';
import Login from './mui/auth/Login';
import Logout from './mui/auth/Logout';
import { TranslationProvider } from './i18n';

import createOnEnter from './util/onEnter';
import configureReducers from './redux/reducers';
import configureStore from './redux/store';

const Admin = ({
    appLayout,
    authClient,
    children,
    customReducers,
    customSagas,
    customRoutes,
    dashboard,
    locale,
    menu,
    messages,
    restClient,
    theme,
    title,
    loginPage,
    logoutButton,
}) => {
    const resources = React.Children.map(children, ({ props }) => props);
    const firstResource = resources[0].name;

    const reducer = configureReducers({ resources, locale, customReducers });
    const store = configureStore({ reducer, restClient, customSagas });
    const onEnter = createOnEnter(authClient);

    const LoginPage = withProps({ title, theme, authClient })(loginPage);
    const LogoutButton = withProps({ authClient })(logoutButton);
    const MenuComponent = withProps({ authClient, logout: <LogoutButton />, resources, hasDashboard: !!dashboard })(menu);
    const Layout = withProps({ authClient, logout: <LogoutButton />, menu: <MenuComponent />, title, theme })(appLayout);

    return (
        <Provider store={store}>
            <TranslationProvider messages={messages}>
                <Router history={syncHistoryWithStore(browserHistory, store)}>
                    {dashboard ? undefined : <Redirect from="/" to={`/${firstResource}`} />}
                    <Route path="/login" component={LoginPage} />
                    <Route path="/" component={Layout} resources={resources}>
                        {customRoutes && customRoutes()}
                        {dashboard && <IndexRoute component={dashboard} onEnter={onEnter()} />}
                        {resources.map(resource => (
                            <CrudRoute
                                key={resource.name}
                                path={resource.name}
                                list={resource.list}
                                create={resource.create}
                                edit={resource.edit}
                                show={resource.show}
                                remove={resource.remove}
                                options={resource.options}
                                onEnter={onEnter}
                            />
                        ))}
                    </Route>
                </Router>
            </TranslationProvider>
        </Provider>
    );
}

Admin.propTypes = {
    appLayout: oneOfType([func, string]),
    authClient: func,
    children: node,
    customSagas: array,
    customReducers: object,
    customRoutes: func,
    dashboard: oneOfType([func, string]),
    loginPage: oneOfType([func, string]),
    logoutButton: oneOfType([func, string]),
    menu: oneOfType([func, string]),
    restClient: func,
    theme: object,
    title: string,
    locale: string,
    messages: object,
};

Admin.defaultProps = {
    appLayout: DefaultLayout,
    menu: Menu,
    customReducers: {},
    customSagas: [],
    messages: {},
    title: 'REST UI',
    loginPage: Login,
    logoutButton: Logout,
};

export default Admin;
