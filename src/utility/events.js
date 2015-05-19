var events = {
    on: function(target, event, callback, useCapture) {
        target.addEventListener(event, callback, useCapture);
    },
    off: function(target, event, callback, useCapture) {
        target.removeEventListener(event, callback, useCapture);
    }
};
