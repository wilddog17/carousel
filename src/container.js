var Container = function(option) {
    this.initialize_(option);
};

Container.prototype = {
    initialize_: function(option) {
        this.key_ = getUniqueKey();

        for(var i=0;i<3;i+=1) {
            this.children_.push(new Panel());
        }
    },
    move: function(offset) {

    }
};

assign(Container.prototype, Element, DOM, DOMChildren);