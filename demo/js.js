function mean(array, cb) {
    if (cb) {
        array = array.map(cb);
    }
    const total = array.reduce((a, b) => a + b);
    return total / array.length;
}
mean([2, 57, 11, 4], x => 2342 * x);
