var Panel = function(option) {
    this.initialize_(option);
};

Panel.prototype = {
    initialize_: function(option) {
        this.key_ = getUniqueKey();
    }
};

assign(Panel.prototype, Element, DOM, DOMChildren);