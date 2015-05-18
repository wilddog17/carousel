var STRING = {
    EMPTY: '',
    SPACE: ' '
};
var NODE_NAME = {
    DIV: 'div'
};
var OPEN_TAG = ['<', null, null, '>'];
var CLOSE_TAG = ['</', null, '>'];
var DOM_PROPERTY = [STRING.SPACE, null, '="', null, '"'];

var DOM = {
    key_: 0,
    nodeName_: NODE_NAME.DIV,

    getDOMReference: function() {
        return document.getElementById(this.key_);
    },

    setInnerHTML: function(html) {
        var DOMElement = this.getDOMReference();
        DOMElement.innerHTML = html;
    },

    createImage: function() {
        var boundary = this.getElementBoundary_();
        var internal = this.createChildrenImages();
        return boundary.open +
            internal.join(STRING.EMPTY) +
            boundary.close;
    },

    mountImage: function() {
        var image = this.createImage();
        this.setInnerHTML(image);
    },

    getElementBoundary_: function() {
        var nodeName = this.nodeName_;
        var properties = this.getElementProperties_();
        OPEN_TAG[1] = CLOSE_TAG[1] = nodeName;
        OPEN_TAG[2] = properties;
        return {
            open: OPEN_TAG.join(STRING.EMPTY),
            close: CLOSE_TAG.join(STRING.EMPTY)
        };
    },

    getElementProperties_: function() {
        var html = [this.getElementProperty_('id', this.key_)];
        var properties_ = this.properties_;
        for(var key in properties_) {
            if(properties_.hasOwnProperty(key)) {
                var property = (typeof properties_[key] === 'string') ?
                    properties_[key] : properties_[key].join(STRING.SPACE);
                var value = this.getElementProperty_(key, property);
                html.push(value);
            }
        }

        return html.join(STRING.EMPTY);
    },
    getElementProperty_: function(name, value) {
        DOM_PROPERTY[1] = name;
        DOM_PROPERTY[3] = value;
        return DOM_PROPERTY.join(STRING.EMPTY);
    }
};