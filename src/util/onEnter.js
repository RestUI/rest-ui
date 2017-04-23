import { AUTH_CHECK } from '../auth';

export default function createOnEnter(authClient) {
    return authClient ?
        params => (nextState, replace, callback) => authClient(AUTH_CHECK, params)
            .then(_ => params && params.scrollToTop ? window.scrollTo(0, 0) : null)
            .catch((e) => {
                replace({
                    pathname: (e && e.redirectTo) || '/login',
                    state: {
                        nextPathname: nextState.location.pathname
                    },
                });
            })
            .then(callback)
        :
        params => _ => params && params.scrollToTop ? window.scrollTo(0, 0) : null;
}