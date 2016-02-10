/**
 * Created by cselvaraj on 4/29/14.
 */
angular.module('searchblox.trust',[]).filter('trust', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});

/**
 * Created by Adeel on 1/15/16.
 */

angular.module('searchblox.filters',[]).filter('reverse', function () {
	return function(items) {
	    return items.slice().reverse();
	  };
});
