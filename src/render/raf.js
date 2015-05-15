window.raf_ = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, this.duration_);
    };

var RAF = {
    duration_: 1000/30,

    loop_: function() {

    },

    setDuration: function(duration) {
        this.duration_ = duration;
    },

    start: function() {

    },
    stop: function() {

    }
};