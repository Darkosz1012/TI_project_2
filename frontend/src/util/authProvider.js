import { createAuthProvider } from 'react-token-auth';
import { decodeToken } from "react-jwt";

export const [useAuth, authFetch, login, logout] =
    createAuthProvider({
        accessTokenKey: 'accessToken',
        onUpdateToken: (token) => fetch('/api/update-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(token)
        })
            .then(async(r) => {
                var body = await r.json()
                return body.token
            })
    });


export var UserId = (function () {
    var _id = '';

    if(localStorage.getItem("REACT_TOKEN_AUTH_KEY")){
        var tokens = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"))
        _id = decodeToken(tokens.accessToken).id;
    }

    return {
        setId: function (id) {
            _id = id;
        },
        getId: function () {
            return _id;
        }
    };
})();