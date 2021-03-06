(function () {

'use strict';

angular.module('OpenSlidesApp.mediafiles.projector', ['OpenSlidesApp.mediafiles'])

.config([
    'slidesProvider',
    function(slidesProvider) {
        slidesProvider.registerSlide('mediafiles/mediafile', {
            template: 'static/templates/mediafiles/slide_mediafile.html'
        });
    }
])

.controller('SlideMediafileCtrl', [
    '$scope',
    'Mediafile',
    function($scope, Mediafile) {
        // load mediafile object
        var mediafile = Mediafile.get($scope.element.id);
        $scope.mediafile = mediafile;

        // Allow the elements to render properly
        setTimeout(function() {
            if ($scope.mediafile.is_pdf) {
                $scope.pdfName = mediafile.title;
                $scope.pdfUrl = mediafile.mediafileUrl;
            } else if ($scope.mediafile.is_video) {
                var player = angular.element.find('#video-player')[0];
                if ($scope.element.playing) {
                    player.play();
                } else {
                    player.pause();
                }
            }
        }, 0);
    }
]);

})();
