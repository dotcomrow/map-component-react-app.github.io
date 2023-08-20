import React from 'react';
import './App.css';
import MyMap from './components/map-component';
import { useGeographic } from "ol/proj.js";

function App() {
    useGeographic();

    function oauth2SignIn() {
        // Google's OAuth 2.0 endpoint for requesting an access token
        var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

        // Create element to open OAuth 2.0 endpoint in new window.
        var form = document.createElement('form');
        form.setAttribute('method', 'GET'); // Send as a GET request.
        form.setAttribute('action', oauth2Endpoint);

        // Parameters to pass to OAuth 2.0 endpoint.
        var params = {
            'client_id': '<GOOGLE_OAUTH_CLIENT_ID>',
            'redirect_uri': window.location.href,
            'scope': 'email profile openid',
            'state': 'try_sample_request',
            'include_granted_scopes': 'true',
            'nonce':'testnonce',
            'response_type': 'token id_token'
        };

        // Add form parameters as hidden input values.
        for (var p in params) {
            var input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', p);
            input.setAttribute('value', params[p]);
            form.appendChild(input);
        }

        // Add form to page and submit it to open the OAuth 2.0 endpoint.
        document.body.appendChild(form);
        form.submit();
    }

    function trySampleRequest() {
        var params = JSON.parse(localStorage.getItem('oauth2-test-params'));
        if (params && params['access_token']) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET',
                'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&' +
                'access_token=' + params['access_token']);
            xhr.onreadystatechange = function (e) {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    window.user = xhr.response;
                } else if (xhr.readyState === 4 && xhr.status === 401) {
                    // Token invalid, so prompt for user permission.
                    oauth2SignIn();
                }
            };
            xhr.send(null);
        } else {
            oauth2SignIn();
        }
    }

    const mapIsReadyCallback = (map) => {
        console.log(map);
        trySampleRequest();
    };

    return (
        <div className="map-wrapper">
            <MyMap mapIsReadyCallback={mapIsReadyCallback}/>
        </div>
    );
}

export default App;