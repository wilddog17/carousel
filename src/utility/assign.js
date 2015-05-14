var assign = function(target, sources) {
    if(target === null || target === undefined) {
        throw new TypeError('assign: target cannot be null or undefined');
    }

    var target_ = Object(target);
    for(var i=1, length=arguments.length; i<length; i+=1) {
        var argument = arguments[i];
        if(argument === null || argument === undefined) {
            continue;
        }

        var source_ = Object(argument);
        for(var key in source_) {
            if(source_.hasOwnProperty(key)) {
                target_[key] = source_[key];
            }
        }
    }

    return target_;
};