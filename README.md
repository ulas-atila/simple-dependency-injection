# Dependancy injection (container)
Inspired by [Dependancy injection in symfony](https://symfony.com/doc/current/components/dependency_injection.html)

## Install
```
    npm install simple-dependency-injection
```

Example of "services.yaml":
```yaml
parameters:
    paramA: "paramA"
    paramB: "paramB"
services:
    serviceA:
        file: "/a"
        arguments: ["@serviceB"]
    serviceB:
        file: "/b_c"
        class: 'B'
        arguments: ["@serviceC", "%paramA"]
        tags: ['a tag']
    serviceC:
        file: "/b_c"
        class: 'C'
        arguments: ["%paramB"]
        tags: ['a tag']
    serviceD:
        file: "/d"
        arguments: ["*a tag"]
```

Example of a service:
```js
// /a.js
module.exports = class {
    constructor(b) {
        this.b = b;
    }
    log() {
        return `${this.b.log()} - A`;
    }
}
```


How to use:
```js
// /index.js
const Container = require("simple-dependency-injection");
const container = new Container('/services.yaml');

const serviceA = container.get('serviceA');

```

You can find more examples of defined classes in /test/data/
