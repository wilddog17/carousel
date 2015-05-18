var DOMChildren = {
    createChildrenImages: function() {
        var children = this.children_;
        return (typeof children === 'object') ?
            children.map(function(child) {
                return child.createImage();
            }) : [this.children_];
    }
};