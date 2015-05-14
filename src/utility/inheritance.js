var inheritance = function(target, parent) {
    parent.call(target);
    assign(target.prototype, parent.prototype);
};