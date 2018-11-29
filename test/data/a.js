module.exports = class {
    constructor(b) {
        this.b = b;
    }
    log() {
        return `${this.b.log()} - A`;
    }
}
