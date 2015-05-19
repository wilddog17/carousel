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

assign(Carousel.prototype,
    Observer, Model, Gesture, GestureSession);

Carousel.SESSION_TYPE = SESSION_TYPE;
Carousel.DIRECTION = DIRECTION;
Carousel.EVENT_TOUCH = EVENT_TOUCH;
Carousel.EVENT_MOUSE = EVENT_MOUSE;
Carousel.EVENT_POINTER = EVENT_POINTER;