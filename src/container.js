var Container = function(option) {
    this.initialize_(option);
};

Container.prototype = {
    initialize_: function(option) {
        this.key_ = 0;
    },
    move: function(offset) {
        this.setProperty('style')
    }
};

assign(Container.prototype, Element, DOM, DOMChildren);