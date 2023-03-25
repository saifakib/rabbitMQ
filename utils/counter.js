function* generator() {
    let index = 1;
    while(true) {
        yield index;
        index++
    }
}

module.exports = generator;
