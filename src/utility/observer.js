var Observer = {
    listeners_: {},
    on: function(event, listener) {
        if(!this.listeners_[event]) {
            this.listeners_[event] = [];
        }

        this.listeners_[event].push(listener);
    },
    off: function(event, listener) {
        var listeners = this.listeners_[event] || [];
        var index = listeners.indexOf(listener);
        if(index < 0) {
            return;
        }

        listeners.splice(index, 1);
    },
    emit: function(event, parameter) {
        var listeners = this.listeners_[event];
        if(!listeners) {
            return;
        }

        for(var i=0;i<listeners.length;i+=1) {
            listeners[i].call(this, parameter);
        }
    }
};