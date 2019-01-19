import { Application, Service } from "../lib/application";

const myApp: Application<{
    foo: {
        bar: string;
    }
}> = null;
(myApp.service("foo").get(0)).then(obj => obj.bar);
