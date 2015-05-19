var EVENT_POINTER = {
    start: 'pointerdown',
    move: 'pointermove',
    end: 'pointerup',
    cancel: 'pointercancel'
};
var EVENT_TOUCH = {
    start: 'touchstart',
    move: 'touchmove',
    end: 'touchend',
    cancel: 'touchcancel'
};
var EVENT_MOUSE = {
    start: 'mousedown',
    move: 'mousemove',
    end: 'mouseup'
};

var Gesture = {
    threshold: 10,
    gestureContainerId_: '',

    bindGesture: function(id) {
        this.onstart_ = this.onstart_ || this.onStart.bind(this);
        this.onmove_ = this.onmove_ || this.onMove.bind(this);
        this.onend_ = this.onend_ || this.onEnd.bind(this);

        this.gestureContainerId_ = id;
        this.hasPointerEvent_ = !!window.PointerEvent;

        this.bindGestureStartEvent_();
    },

    bindGestureStartEvent_: function() {
        var container = document.getElementById(this.gestureContainerId_);
        var TouchEvent = this.hasPointerEvent_ ?
            EVENT_POINTER : EVENT_TOUCH;

        events.on(container, TouchEvent.start, this.onstart_);
        if(!this.hasPointerEvent_) {
            events.on(container, EVENT_MOUSE.start, this.onstart_);
        }
    },
    attachGestureEvent_: function() {
        var container = document.getElementById(this.gestureContainerId_);
        var TouchEvent = this.hasPointerEvent_ ?
            EVENT_POINTER : EVENT_TOUCH;

        events.on(container, TouchEvent.move, this.onmove_);
        events.on(container, TouchEvent.end, this.onend_);
        events.on(container, TouchEvent.cancel, this.onend_);

        if(!this.hasPointerEvent_) {
            events.on(container, EVENT_MOUSE.move, this.onmove_);
            events.on(container, EVENT_MOUSE.end, this.onend_);
        }
    },
    removeGestureEvent_: function() {
        var container = document.getElementById(this.gestureContainerId_);
        var TouchEvent = this.hasPointerEvent_ ?
            EVENT_POINTER : EVENT_TOUCH;

        events.off(container, TouchEvent.move, this.onmove_);
        events.off(container, TouchEvent.end, this.onend_);
        events.off(container, TouchEvent.cancel, this.onend_);

        if(!this.hasPointerEvent_) {
            events.off(container, EVENT_MOUSE.move, this.onmove_);
            events.off(container, EVENT_MOUSE.end, this.onend_);
        }
    },

    onStart: function(event) {
        this.createGestureSession(event);
        this.attachGestureEvent_();

        var session = this.getGestureSession();
        this.emit('gesture:start', session);
    },
    onMove: function(event) {
        this.updateGestureSession(event);

        var session = this.getGestureSession();
        this.emit('gesture:move', session);
    },
    onEnd: function(event) {
        var session = this.getGestureSession();
        this.emit('gesture:end', session);

        this.clearGestureSession();
        this.removeGestureEvent_();
    }
};