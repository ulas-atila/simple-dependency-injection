"use strict";

class B
{
    constructor(c, param)
    {
        this.c = c;
        this.param = param;
    }
    log()
    {
        return `${this.c.log()} - ${this.param} - B`;
    }
}

class C
{
    constructor(param)
    {
        this.param = param;
    }
    log()
    {
        return `${this.param} - C`;
    }
}

module.exports = {
    B,
    C
}
