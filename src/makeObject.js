function makeObject(input, depth) {
    // @ts-ignore
    return input.reduce((o, [k, v]) => Object.assign(o, {
        [k]: (Array.isArray(v) && depth > 0) ? makeObject(v, depth - 1) : v,
    }), {});
}

// do NOT remove the following line
module.exports = makeObject;
