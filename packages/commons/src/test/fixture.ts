import assert from 'assert';

const findAllData = [{
  id: 0,
  description: 'You have to do something'
}, {
  id: 1,
  description: 'You have to do laundry'
}];

declare global {
  function thingThatDoesNotExist();
}

export const Service = {
  events: [ 'log' ],

  find () {
    return Promise.resolve(findAllData);
  },

  get (name, params) {
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

  create (data) {
    const result = Object.assign({}, data, {
      id: 42,
      status: 'created'
    });

    if (Array.isArray(data)) {
      result.many = true;
    }

    return Promise.resolve(result);
  },

  update (id, data) {
    const result = Object.assign({}, data, {
      id, status: 'updated'
    });

    if (id === null) {
      result.many = true;
    }

    return Promise.resolve(result);
  },

  patch (id, data) {
    const result = Object.assign({}, data, {
      id, status: 'patched'
    });

    if (id === null) {
      result.many = true;
    }

    return Promise.resolve(result);
  },

  remove (id) {
    return Promise.resolve({ id });
  }
};

exports.verify = {
  find (data) {
    assert.deepStrictEqual(findAllData, data, 'Data as expected');
  },

  get (id, data) {
    assert.strictEqual(data.id, id, 'Got id in data');
    assert.strictEqual(data.description, `You have to do ${id}!`, 'Got description');
  },

  create (original, current) {
    var expected = Object.assign({}, original, {
      id: 42,
      status: 'created'
    });
    assert.deepStrictEqual(expected, current, 'Data ran through .create as expected');
  },

  update (id, original, current) {
    var expected = Object.assign({}, original, {
      id: id,
      status: 'updated'
    });
    assert.deepStrictEqual(expected, current, 'Data ran through .update as expected');
  },

  patch (id, original, current) {
    var expected = Object.assign({}, original, {
      id: id,
      status: 'patched'
    });
    assert.deepStrictEqual(expected, current, 'Data ran through .patch as expected');
  },

  remove (id, data) {
    assert.deepStrictEqual({ id }, data, '.remove called');
  }
};
