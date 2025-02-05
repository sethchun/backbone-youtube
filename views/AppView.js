var AppView = Backbone.View.extend({
    el: $('body'),

    events: {
        'click .submit-query': 'fetchVideos',
        'click .thumbnail': 'thumbnailClick'
    },

    initialize: function () {
        this.model.get('videos').getData('Coding'); // Loads page with a default search for 'Coding' videos
        this.listenTo(this.model.get('videos'), 'reset', this.renderVideos);
        this.listenTo(this.model, 'change:selected_video', this.renderSelectedVideo);
    },

    renderVideos: function () {
        var selected_video = this.model.get('videos').models[0];
        this.model.set('video', selected_video);
        var selectedVideoView = new SelectedVideoView({ model: selected_video });
        this.$('.video-player').append(selectedVideoView.render().el);
        this.$('.video-carousel').empty();
        for (let i = 0; i < 5; i++) {
            var video = this.model.get('videos').models[i];
            var videoCarouselView = new VideoCarouselView({ model: video });
            this.$('.video-carousel').append(videoCarouselView.render().el);
        }
    },

    thumbnailClick: function (e) {
        var selectedVideoId = $(e.currentTarget).data().id;
        this.updateSelectedVideo(selectedVideoId);
    },

    updateSelectedVideo: function (videoId) {
        var videos = this.model.get('videos');
        var selectedVideo = videos.findWhere({ videoId: videoId });

        this.model.set('selected_video', selectedVideo);
    },

    renderSelectedVideo: function () {
        var newSelectedVideo = this.model.get('selected_video');
        var selectedVideoView = new SelectedVideoView({ model: newSelectedVideo });
        this.$('.video-player').append(selectedVideoView.render().el);
    },

    fetchVideos: function () {
        this.model.get('videos').getData($('.query').val());

        $('.query').val('');
    }
});
