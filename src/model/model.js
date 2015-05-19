var Model = {
    data_: [],
    index_: 0,

    setIndex: function(index) {
        this.index_ = index;
    },
    getIndex: function() {
        return this.index_;
    },

    setIndexByOffset: function(offset) {
        this.index_ = this.getIndexByOffset(offset);
    },
    getIndexByOffset: function(offset) {
        return this.index_ + offset;
    },

    setData: function(datasource) {
        this.data_ = datasource || [];
    },
    getData: function() {
        return this.data_;
    },
    getDataByIndex: function(index) {
        return this.data_[index];
    },
    getDataByOffset: function(offset) {
        var index = this.getIndexByOffset(offset);
        return this.getDataByIndex(index);
    },

    getDataLength: function() {
        return this.data_.length;
    }
};