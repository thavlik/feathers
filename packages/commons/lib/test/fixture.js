"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const findAllData = [{
        id: 0,
        description: 'You have to do something'
    }, {
        id: 1,
        description: 'You have to do laundry'
    }];
exports.Service = {
    events: ['log'],
    find() {
        return Promise.resolve(findAllData);
    },
    get(name, params) {
        if (params.query.error) {
            return Promise.reject(new Error(`Something for ${name} went wrong`));
        }
        if (params.query.runtimeError) {
            thingThatDoesNotExist(); // eslint-disable-line
        }
        return Promise.resolve({
            id: name,
            description: `You have to do ${name}!`
        });
    },
    create(data) {
        const result = Object.assign({}, data, {
            id: 42,
            status: 'created'
        });
        if (Array.isArray(data)) {
            result.many = true;
        }
        return Promise.resolve(result);
    },
    update(id, data) {
        const result = Object.assign({}, data, {
            id, status: 'updated'
        });
        if (id === null) {
            result.many = true;
        }
        return Promise.resolve(result);
    },
    patch(id, data) {
        const result = Object.assign({}, data, {
            id, status: 'patched'
        });
        if (id === null) {
            result.many = true;
        }
        return Promise.resolve(result);
    },
    remove(id) {
        return Promise.resolve({ id });
    }
};
exports.verify = {
    find(data) {
        assert_1.default.deepStrictEqual(findAllData, data, 'Data as expected');
    },
    get(id, data) {
        assert_1.default.strictEqual(data.id, id, 'Got id in data');
        assert_1.default.strictEqual(data.description, `You have to do ${id}!`, 'Got description');
    },
    create(original, current) {
        var expected = Object.assign({}, original, {
            id: 42,
            status: 'created'
        });
        assert_1.default.deepStrictEqual(expected, current, 'Data ran through .create as expected');
    },
    update(id, original, current) {
        var expected = Object.assign({}, original, {
            id: id,
            status: 'updated'
        });
        assert_1.default.deepStrictEqual(expected, current, 'Data ran through .update as expected');
    },
    patch(id, original, current) {
        var expected = Object.assign({}, original, {
            id: id,
            status: 'patched'
        });
        assert_1.default.deepStrictEqual(expected, current, 'Data ran through .patch as expected');
    },
    remove(id, data) {
        assert_1.default.deepStrictEqual({ id }, data, '.remove called');
    }
};
//# sourceMappingURL=fixture.js.map