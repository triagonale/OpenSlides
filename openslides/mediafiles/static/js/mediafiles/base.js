(function () {

'use strict';

angular.module('OpenSlidesApp.mediafiles', [])

.factory('Mediafile', [
    'DS',
    'jsDataModel',
    'gettext',
    function(DS, jsDataModel, gettext) {
        var name = 'mediafiles/mediafile';
        return DS.defineResource({
            name: name,
            useClass: jsDataModel,
            verboseName: gettext('Files'),
            verboseNamePlural: gettext('Files'),
            getAllImages: function () {
                var images = [];
                angular.forEach(this.getAll(), function(file) {
                    if (file.is_image) {
                        images.push({title: file.title, value: file.mediafileUrl});
                    }
                });
                return images;
            },
            methods: {
                getResourceName: function () {
                    return name;
                },
                // link name which is shown in search result
                getSearchResultName: function () {
                    return this.title;
                },
                // subtitle of search result
                getSearchResultSubtitle: function () {
                    return "File";
                },
            },
            computed: {
                is_pdf: ['filetype', function (filetype) {
                    var PDF_FILE_TYPES = ['application/pdf'];
                    return _.includes(PDF_FILE_TYPES, filetype);
                }],
                is_image: ['filetype', function (filetype) {
                    var IMAGE_FILE_TYPES = ['image/png', 'image/jpeg', 'image/gif'];
                    return _.includes(IMAGE_FILE_TYPES, filetype);
                }],
                is_video: ['filetype', function (filetype) {
                    var VIDEO_FILE_TYPES = [ 'video/quicktime', 'video/mp4', 'video/webm',
                        'video/ogg', 'video/x-flv', 'application/x-mpegURL', 'video/MP2T',
                        'video/3gpp', 'video/x-msvideo', 'video/x-ms-wmv', 'video/x-matroska' ];
                    return _.includes(VIDEO_FILE_TYPES, filetype);
                }],
                is_presentable: ['is_pdf', 'is_image', 'is_video', function (is_pdf, is_image, is_video) {
                    return is_pdf || is_image || is_video;
                }],
                mediafileUrl: [function () {
                    return this.media_url_prefix + this.mediafile.name;
                }],
                filename: [function () {
                    var filename = this.mediafile.name;
                    return /\/(.+?)$/.exec(filename)[1];
                }],
                filetype: [function () {
                    return this.mediafile.type;
                }],
                title_or_filename: ['title', 'mediafile', function (title) {
                    return title || this.filename;
                }]
            },
            relations: {
                belongsTo: {
                    'users/user': {
                        localField: 'uploader',
                        localKey: 'uploader_id',
                    }
                }
            }
        });
    }
])

.run(['Mediafile', function(Mediafile) {}]);

}());
