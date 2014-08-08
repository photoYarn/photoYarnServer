var oauth = (function() {

    var FB_LOGIN_URL = 'https://www.facebook.com/dialog/oauth';
    var FB_LOGOUT_URL = 'https://www.facebook.com/logout.php';

    var tokenStore = window.sessionStorage;
    var appId;

    var loginCallback;
    var loginProcessed;

    var oauthRedirectURL = 'http://localhost:8100/oauthcallback.html';

    var init = function(params) {
        if (params.appId) {
            appId = params.appId;
        } else {
            throw 'appId param not set';
        }

        if (params.tokenStore) {
            tokenStore = params.tokenStore;
        }
    };

    var login = function(callback) {
        var loginWindow;

        if (!appId) {
            callback({status: 'unkonwn', error: 'appId not set'});
        }

        loginCallback = callback;
        loginProcessed = false;

        loginWindow = window.open(FB_LOGIN_URL + '?client_id=' + appId + '&redirect_uri=' + oauthRedirectURL +
                    '&response_type=token&scope=email', '_blank', 'location=no');

    };

    var logout = function(callback) {
        var access_token = tokenStore['access_token']
        delete tokenStore['access_token'];
        if (callback) {
            callback(access_token);
        }
    };

    var oauthCallback = function(url) {
        // Parse the OAuth data received from Facebook
        var queryString;
        var queryObj;

        loginProcessed = true;

        if (url.indexOf("access_token=") !== -1) {
            queryString = url.substr(url.indexOf('#') + 1);
            queryObj = $.deparam(queryString)
            console.log(queryObj)
            tokenStore['access_token'] = queryObj['access_token'];
            console.log(tokenStore)
            if (loginCallback) {
                loginCallback({
                    status: 'connected', 
                    token: queryObj['access_token']
                });
            }
        } else if (url.indexOf("error=") !== -1) {
            queryString = url.substring(url.indexOf('?') + 1, url.indexOf('#'));
            queryObj = $.deparam(queryString);
            if (loginCallback) {
                loginCallback({
                    status: 'not_authorized', 
                    error: queryObj.error
                });
            }
        } else {
            if (loginCallback) {
                loginCallback({
                    status: 'not_authorized'
                });
            }
        }
    };

    return {
        login: login,
        init: init,
        oauthCallback: oauthCallback,
        logout: logout
    }

})();