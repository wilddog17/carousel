var event = {
    on: function(target, event, callback, useCapture) {
        target.addEventListener(event, callback, useCapture);
    },
    off: function(target, event, callback) {
        target.removeEventListener(event, callback, useCapture);
    }
};
