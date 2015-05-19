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

var DIRECTION = {
    left: 1,
    right: 2,
    up: 3,
    down: 4,
    origin: 5
};
var TYPE = {
    tab: 1,
    swipe: 2,
    scroll: 3
};

var Gesture = {
    threshold: 10,
    session_: null,
    prev_: null,
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
        this.createEventSession_(event);
        this.attachGestureEvent_();
        console.log(this.session_.direction);
    },
    onMove: function(event) {
        this.updateEventSession_(event);
        console.log(this.session_.direction);
    },
    onEnd: function(event) {
        console.log(this.session_.direction);
        this.clearEventSession_();
        this.removeGestureEvent_();
    },

    clearEventSession_: function() {
        this.prev_ = assign({}, this.session_);
        this.session_ = null;
    },
    createEventSession_: function(event) {
        var event_ = event || window.event;
        this.session_ = {
            type: TYPE.tab,
            direction: DIRECTION.origin,
            position: {
                start: this.getPointerPosition_(event_),
                delta: {x:0, y:0}
            },
            targetEvent: event_,
            startTime: Date.now()
        };

        return this.session_;
    },
    getPointerPosition_: function(event) {
        var pointer = event.touches ? event.touches[0] : event;
        return {
            x: pointer.pageX || pointer.clientX,
            y: pointer.pageY || pointer.clientY
        };
    },
    updateEventSession_: function(event) {
        var event_ = event || window.event;
        var session = this.session_;
        session.targetEvent = event_;

        var position = this.getPointerPosition_(event_);
        var deltaX = position.x - session.position.start.x,
            deltaY = position.y - session.position.start.y;
        var delta_ = {
            x: (Math.abs(deltaX) > this.threshold) ? deltaX : 0,
            y: (Math.abs(deltaY) > this.threshold) ? deltaY : 0
        };
        session.position.delta = delta_;

        // update session type
        if(session.type === TYPE.tab) {
            var absX = Math.abs(delta_.x);
            var absY = Math.abs(delta_.y);
            if (absX > 0 && absX >= absY) {
                session.type = TYPE.swipe;

            } else if (absY > 0 && absY > absX) {
                session.type = TYPE.scroll;

            }
        }

        // update session direction
        if (session.type === TYPE.swipe && delta_.x !== 0) {
            session.direction = (delta_.x < 0) ?
                DIRECTION.left : DIRECTION.right;

        } else if (session.type === TYPE.scroll && delta_.y !== 0) {
            session.direction = (delta_.y < 0) ?
                DIRECTION.up : DIRECTION.down;
        }
    }
};