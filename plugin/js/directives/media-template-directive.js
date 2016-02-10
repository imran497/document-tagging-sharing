/**
 * Created by cselvaraj on 5/7/14.
 */

angular.module('searchblox.contentItem', []).
    directive('contentItem', ['$compile', '$http', '$templateCache','$sce', function($compile, $http, $templateCache, $sce) {

        var getTemplate = function(contentType) {
            var templateLoader,
                baseUrl = 'views/component-templates/',
                templateMap = {
                    image: 'image.html',
                    video: 'video.html',
                    href: 'href.html'
                };

            var templateUrl = baseUrl + templateMap[contentType];
            templateLoader = $http.get(templateUrl, {cache: $templateCache});

            return templateLoader;

        }

        var linker = function(scope, element, attrs) {
            scope.$watch(function () {
                if (scope.content.contentUrl && scope.content.contentNature == "video") {
                    scope.url = $sce.trustAsResourceUrl(scope.content.contentUrl);
                }
                else {
                    scope.url = scope.content.contentUrl;
                }
            });


            if(!scope.content.tags || scope.content.tags.length == 0) {
                scope.content.tags = [];
            } else if(scope.content.tags.indexOf(",") > -1) {
                scope.content.tags = scope.content.tags.split(",");
            } else if(typeof scope.content.tags == "string") {
                var tag = scope.content.tags;
                scope.content.tags = [];
                scope.content.tags.push(tag);
            }

            scope.$watch('content.tags', function(newValue, oldValue) {
                
                if (newValue) 
                {
                    if(newValue.indexOf(",") > -1) {
                        scope.content.tags = newValue.split(",");
                    } else if(typeof newValue == "string") {
                        var tag = newValue;
                        scope.content.tags = [];
                        scope.content.tags.push(tag);
                    }
                    
                    if(newValue != oldValue) {
                        console.log(scope.content.tags)
                        scope.setNotesTagsForDoc(scope.content);
                    }
                }
            },true);

            // scope.$watch('content.note', function(newValue, oldValue) {       
            //     if (newValue && newValue != oldValue) {
            //         scope.content.note = newValue;
            //         scope.setNotesTagsForDoc(scope.content);
            //     }
            // });

            var loader = getTemplate(scope.content.contentNature);

            var promise = loader.success(function(html) {
                element.html(html);
            }).then(function (response) {
                element.replaceWith($compile(element.html())(scope));
            });
        }

        return {
            restrict: 'E',
            scope: {
                content:'=',
                mdChipsSeparator : '=',
                addDocToCart: '&',
                showMoreLikeThis : '&',
                setNotesTagsForDoc : '&'
            },
            link: linker,
            controller: function ($scope) {

                $scope.getLastModified = function (lastmodified) {
                    if(lastmodified && lastmodified.indexOf("+")) {
                        var date_gmt = lastmodified.split("+");
                        date_gmt[1]  = date_gmt[1].replace(":", "");
                        var lastmodified = date_gmt[0] + "+" + date_gmt[1];
                    }
                    return moment(lastmodified).format("MMMM Do YYYY, h:mm:ss a");
                }
                $scope.formatData = function (obj) {
                    if (!angular.isArray(obj))
                        return [obj];
                    else
                        return obj;
                }
            }
        };
    }]);

