var t = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    formatTime: function(e) {
        var n = e.getFullYear(), r = e.getMonth() + 1, o = e.getDate(), u = e.getHours(), i = e.getMinutes(), a = e.getSeconds();
        return [ n, r, o ].map(t).join("/") + " " + [ u, i, a ].map(t).join(":");
    }
};