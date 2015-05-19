var SESSION_TYPE = {
    tab: 1,
    scroll: 2,
    doubletab: 3
};

var GestureSession = {
    prev_: {},
    session_: {},

    getGestureSession: function() {
        return this.session_;
    },

    createGestureSession: function(event) {
        var event_ = event || window.event;
        var start_ = this.getPointerPosition_(event_);
        this.session_ = {
            type: SESSION_TYPE.tab,
            start: start_,
            position: start_,
            delta: {
                x:0,
                y:0
            },
            target: event_,
            startTime: Date.now()
        };
    },
    updateGestureSession: function(event) {
        this.updateSessionTarget_(event);
        this.updateSessionPosition_();
        this.updateSessionType_();
    },
    updateSessionTarget_: function(event) {
        this.session_.target = event || window.event;
    },
    updateSessionPosition_: function() {
        var session = this.session_;
        var position = this.getPointerPosition_(session.target);
        var start = session.start;
        var deltaX = position.x - start.x,
            deltaY = position.y - start.y;

        session.position = position;
        session.delta = {
            x: (Math.abs(deltaX) > this.threshold) ? deltaX : 0,
            y: (Math.abs(deltaY) > this.threshold) ? deltaY : 0
        };
    },

    updateSessionType_: function() {
        var session = this.session_;
        var delta = session.delta;
        if(session.type === SESSION_TYPE.tab) {
            if (delta.x !== 0 || delta.y !== 0) {
                session.type = SESSION_TYPE.scroll;
            }
        }
    },

    clearGestureSession: function() {
        this.prev_ = assign({}, this.session_);
        this.session_ = null;
    },

    getPointerPosition_: function(event) {
        var pointer = event.touches ? event.touches[0] : event;
        return {
            x: pointer.pageX || pointer.clientX,
            y: pointer.pageY || pointer.clientY
        };
    }
};