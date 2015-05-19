var Container = function(events, option) {
    this.initialize_(events, option);
};

Container.prototype = {
    initialize_: function(events, option) {
        this.events_ = events;
        this.key_ = getUniqueKey();

        for(var i=0;i<3;i+=1) {
            this.children_.push(new Panel());
        }
    },
    move: function(position) {

    }
};

assign(Container.prototype, Element, DOM, DOMChildren);