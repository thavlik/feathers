"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
function default_1(app, name) {
    const getService = () => (name && typeof app.service === 'function')
        ? app.service(name) : app;
    describe('Service base tests', () => {
        it('.find', () => {
            return getService().find().then(todos => assert_1.default.deepEqual(todos, [{
                    text: 'some todo',
                    complete: false,
                    id: 0
                }]));
        });
        it('.get and params passing', () => {
            const query = {
                some: 'thing',
                other: ['one', 'two'],
                nested: { a: { b: 'object' } }
            };
            return getService().get(0, { query })
                .then(todo => assert_1.default.deepEqual(todo, {
                id: 0,
                text: 'some todo',
                complete: false,
                query: query
            }));
        });
        it('.create and created event', done => {
            getService().once('created', function (data) {
                assert_1.default.strictEqual(data.text, 'created todo');
                assert_1.default.ok(data.complete);
                done();
            });
            getService().create({ text: 'created todo', complete: true });
        });
        it('.update and updated event', done => {
            getService().once('updated', data => {
                assert_1.default.strictEqual(data.text, 'updated todo');
                assert_1.default.ok(data.complete);
                done();
            });
            getService().create({ text: 'todo to update', complete: false })
                .then(todo => getService().update(todo.id, {
                text: 'updated todo',
                complete: true
            }));
        });
        it('.patch and patched event', done => {
            getService().once('patched', data => {
                assert_1.default.strictEqual(data.text, 'todo to patch');
                assert_1.default.ok(data.complete);
                done();
            });
            getService().create({ text: 'todo to patch', complete: false })
                .then(todo => getService().patch(todo.id, { complete: true }));
        });
        it('.remove and removed event', done => {
            getService().once('removed', data => {
                assert_1.default.strictEqual(data.text, 'todo to remove');
                assert_1.default.strictEqual(data.complete, false);
                done();
            });
            getService().create({ text: 'todo to remove', complete: false })
                .then(todo => getService().remove(todo.id)).catch(done);
        });
        it('.get with error', () => {
            let query = { error: true };
            return getService().get(0, { query }).catch(error => assert_1.default.ok(error && error.message));
        });
    });
}
exports.default = default_1;
;
//# sourceMappingURL=client.js.map