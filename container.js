const utils = require('./utils');
const process = require('process');

module.exports = class {
    constructor(file, baseApp = null) {
        if (baseApp === null) {
            baseApp = process.cwd();
        }
        const data = utils.getFile(file, baseApp);
        this.services = data.services;
        this.parameters = data.parameters;
        this.baseApp = baseApp;
        this.cache = {'@container': this};
    }
    get(name) {
        if (name in this.cache) {
            return this.cache[name];
        }
        if (!(name in this.services)) {
            this.cache[name] = require(name);

            return this.cache[name];
        }

        const service = this.services[name];

        const className = service["file"][0] !== "/" ? service["file"] : utils.getRelativePath(service["file"], this.baseApp);
        const args = this._convertArguments(service['arguments']);

        let _class = require(className);

        if (service['class']) {
            _class = _class[service['class']];
        }

        const obj = new (Function.prototype.bind.apply(_class, [null, ...args]));

        this.cache[name] = obj;

        return obj;
    }
    getParameter(name) {
        return this.parameters[name];
    }
    getTaggedServices(tag) {
        const services = [];
        for(const serviceName in this.services) {
            const service = this.services[serviceName];
            if (service.tags && service.tags.indexOf(tag) !== -1) {
                services.push(this.get(serviceName));
            }
        }

        return services;
    }
    _convertArguments(_args) {
        return _args.map(arg => {
            if (arg[0] == "@") {
                return this.get(arg.substr(1));
            }
            if (arg[0] == "%") {
                return this.getParameter(arg.slice(1));
            }
            if (arg[0] == "*") {
                return this.getTaggedServices(arg.slice(1));
            }

            return arg;
        });
    }
}
