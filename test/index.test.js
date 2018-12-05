const JsonExpolrer = require('../index');
const mock = require('../stubs/swapi.json');
const test = require('ava');

const jxplore = new JsonExpolrer();

console.log("Testing Objects at all level of deep")

test('1 level deep: object', t => {
    const filter = "captain";
    const actual = jxplore.initDev(mock, filter);
    const expected = mock.captain;
	t.is(JSON.stringify(actual), JSON.stringify(expected));
});

test('1 level deep: object -> string', t => {
    const filter = "hair_color";
    const actual = jxplore.initDev(mock, filter);
    const expected = mock.hair_color;
	t.is(actual, expected);
});

test('2 level deep: object -> string', t => {
    const filter = "captain.name";
    const actual = jxplore.initDev(mock, filter);
    const expected = { name: "Jack Sparrow" };
    t.is(JSON.stringify(actual), JSON.stringify(expected));
});

test('3 level deep: object -> number', t => {
    const filter = "captain.powers.physic";
    const actual = jxplore.initDev(mock, filter);
    const expected = { powers: { physic: 20 } };
    t.is(JSON.stringify(actual), JSON.stringify(expected));
});

test('4 level deep: object -> number', t => {
    const filter = "captain.powers.strength.mysthic";
    const actual = jxplore.initDev(mock, filter);
    const expected = { powers: { strength: { mysthic: 200 } } };
    t.is(JSON.stringify(actual), JSON.stringify(expected));
});

console.log("Testing Array at all level of deep")

test('1 level deep: Array', t => {
    const filter = "films";
    const actual = jxplore.initDev(mock, filter);
    const expected = mock.films;
	t.is(JSON.stringify(actual), JSON.stringify(expected));
});

test('2 level deep: Array', t => {
    const filter = "captain.books";
    const actual = jxplore.initDev(mock, filter);
    const expected = { books: mock.captain.books};
	t.is(JSON.stringify(actual), JSON.stringify(expected));
});

test('2 level deep: Array of Objects', t => {
    const filter = "edited.when";
    const actual = jxplore.initDev(mock, filter);
    const expected = { when: mock.edited.when };
	t.is(JSON.stringify(actual), JSON.stringify(expected));
});

test('2 level deep: Array of Objects and Recursive', t => {
    const filter = "edited.when.hours";
    const actual = jxplore.initDev(mock, filter);
    const expected = { when: [ { hours: 2 }, { hours: 4 }, { hours: 6 }, { hours: 8 } ] };
	t.is(JSON.stringify(actual), JSON.stringify(expected));
});

console.log("Testing Recursive Object at all level of deep")

test('1 level deep: Recursive Object -> strings', t => {
    const filter = "vehicles.name";
    const actual = jxplore.initDev(mock, filter);
    const expected = [ { name: "death Ragner" }, { name: null },{ name: undefined } ];
	t.is(JSON.stringify(actual), JSON.stringify(expected));
});

test('1 level deep: Recursive Object -> objects', t => {
    const filter = "vehicles.other";
    const actual = jxplore.initDev(mock, filter);
    const expected = [
        { other: {lastbutnotleast: "beautiful dragon", lastleast: "beautiful cat"}},
        { other: {lastbutnotleast: null, lastleast: "ugly cat"}},
        { other: {lastbutnotleast: "beautiful dragon"}}];
	t.is(JSON.stringify(actual), JSON.stringify(expected));
});

test('2 level deep: Recursive Object -> objects', t => {
    const filter = "vehicles.other.lastleast";
    const actual = jxplore.initDev(mock, filter);
    const expected = [
        { other: {lastleast: "beautiful cat"}},
        { other: {lastleast: "ugly cat"}},
        { other: {lastleast: undefined}}];
	t.is(JSON.stringify(actual), JSON.stringify(expected));
});