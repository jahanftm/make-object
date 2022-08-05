const makeObject = require('../makeObject');

const data = [
  ['a-a', 42],
  ['b-bb', true],
  ['c', [
    ['d', []],
    [4, { foo: 'bar' }],
    ['f', [
      ['g-ggg', [
        [2, () => {}],
      ]],
    ]],
  ]],
];

test('test_result', () => {
  const result = makeObject().fromArray(data);
  expect(result).toEqual({
    'a-a': 42,
    'b-bb': true,
    c: {
      d: {},
      4: {
        foo: 'bar',
      },
      f: {
        'g-ggg': {
          2: expect.any(Function),
        },
      },
    },
  });
});

test('test_result_to_depth', () => {
  const result = makeObject().toDepth(3).fromArray(data);

  expect(result).toEqual({
    'a-a': 42,
    'b-bb': true,
    c: {
      d: {},
      4: {
        foo: 'bar',
      },
      f: [
        ['g-ggg', [
          [2, expect.any(Function)],
        ]],
      ],
    },
  });
});

test('test_result_camelify', () => {
  const result = makeObject().camelifyKeys().fromArray(data);
  expect(result).toEqual({
    aA: 42,
    bBb: true,
    c: {
      d: {},
      4: {
        foo: 'bar',
      },
      f: {
        gGgg: {
          2: expect.any(Function),
        },
      },
    },
  });
});

test('test_result_camelify_to_depth', () => {
  const result1 = makeObject().camelifyKeys().toDepth(3).fromArray(data);
  const result2 = makeObject().toDepth(3).camelifyKeys().fromArray(data);

  expect(result1).toStrictEqual(result2);
  expect(result1).toEqual({
    aA: 42,
    bBb: true,
    c: {
      d: {},
      4: {
        foo: 'bar',
      },
      f: [
        ['g-ggg', [
          [2, expect.any(Function)],
        ]],
      ],
    },
  });
});