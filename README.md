# Dependancy injection (container)
Inspired by [Dependancy injection in symfony](https://symfony.com/doc/current/components/dependency_injection.html)

## Install
```
    npm install simple-dependency-injection
```

## How to use

Given a file "class.js"
```js
class A
{
    constructor(b, container)
    {
        this.b = b;
        this.container = container;
    }
}
class B
{
    constructor(c, context)
    {
        this.c = c;
        this.context = context;
    }
}
class C
{
    constructor(param)
    {
        this.param = param;
    }
}
class D
{
    constructor(services)
    {
        this.services = services;
    }
}

module.exports {
    A,
    B,
    C,
    D
}
```

Definition of services in "services.yaml":
```yaml
parameters:
    paramA: "paramA"
services:
    serviceA:
        file: "/class"
        class: "A"
        arguments: ["@serviceB", "@container"]
    serviceB:
        file: "/class"
        class: "B"
        arguments: ["@serviceC", "@context"]
        tags: ['a tag']
    serviceC:
        file: "/class"
        class: "C"
        arguments: ["%paramA"]
        tags: ['a tag']
    serviceD:
        file: "/class"
        class: "D"
        arguments: ["*a tag"]
```

How to use:
```js
// /index.js
const Container = require("simple-dependency-injection");
const container = new Container('/services.yaml');

const serviceA = container.get('serviceA');
const parameter = container.getParameter('paramA');
const services = container.getTaggedServices('a tag');
container.setContextParameter('name', 'value');

```

You can find more examples of defined classes in /test/data/
