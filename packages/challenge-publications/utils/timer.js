Timer = function () {
    this.started = Date.now();
};

Timer.prototype.delta = function () {
    return (Date.now() - this.started) / 1000 + ' seconds';
};