var Carousel = function(id, option) {
    this.initialize_(id, option);
};

Carousel.prototype = {
    initialize_: function(id, option) {
        this.containerId = id;
        this.instance_ = new Container(option);
        this.renderer_ = new Renderer(option);

        this.bindGesture(id);
    }
};

assign(Carousel.prototype, Observer, Model, Gesture);