var Element = {
    properties_: {},
    parent_: null,
    children_: [],
    key_: 0,

    isInitialize_: false,
    isDirty_: true,

    create: function(key, properties) {
        this.key_ = key || createUniqueId();
        this.properties_ = properties || {};

        this.isInitialize_ = true;
    },

    setProperty: function(name, value) {
        this.properties_[name] = value;
    },
    getProperty: function(name) {
        return this.properties_[name];
    },

    insertChildAt: function(element, index) {
        var back = this.children_.splice(index);
        this.children_.concat([element], back);
    },
    appendChild: function(element) {
        this.children_.push(element);
    },
    removeChild: function(element) {
        var index = this.children_.indexOf(element);
        if(index < 0) {
            return;
        }

        return this.children_.splice(index, 1);
    },

    getChildren: function() {
        return this.children_;
    },
    getChildAt: function(index) {
        return this.children_[index];
    },

    setParent: function(parent) {
        this.parent_ = parent;
    },
    getParent: function() {
        return this.parent_;
    }
};