"use strict";

module.exports = class A
{

    constructor(b, context)
    {
        this.b = b;
        this.context = context;
    }
    log()
    {
        return `${this.b.log()} - A`;
    }
    async getContext()
    {
        return new Promise((res) => {
            setTimeout(() => {
                res(this.context);
            }, 100);
        });
    }
}
