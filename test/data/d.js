"use strict";

module.exports = class D
{
    constructor(objs)
    {
        this.objs = objs;
    }
    log()
    {
        const log = this.objs.map(val => val.log()).join(' - ') + ' - D';

        return log;
    }
}
