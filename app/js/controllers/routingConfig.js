angular
    .module('xbrlImport', [
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/access_token=:accessToken', {
                template: '',
                controller: function ($location,$rootScope) {
                    var hash = $location.path().substr(1);

                    var splitted = hash.split('&');
                    var params = {};
                    for (var i = 0; i < splitted.length; i++) {
                        var param  = splitted[i].split('=');
                        var key    = param[0];
                        var value  = param[1];
                        params[key] = value;
                        $rootScope.accesstoken=params;

                        console.log('param.........', key, value);
                    }
                    $location.path("/about");
                }
            }).otherwise({
            redirectTo: '/'
        });
    });
