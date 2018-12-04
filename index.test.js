const JsonExpolrer = require('./index');
const mock = require('./stubs/swapi.json');
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
    const expected = mock.captain.name;
	t.is(actual, expected);
});

test('3 level deep: object -> number', t => {
    const filter = "captain.powers.physic";
    const actual = jxplore.initDev(mock, filter);
    const expected = mock.captain.powers.physic;
	t.is(actual, expected);
});

test('4 level deep: object -> number', t => {
    const filter = "captain.powers.strength.mysthic";
    const actual = jxplore.initDev(mock, filter);
    const expected = mock.captain.powers.strength.mysthic;
	t.is(actual, expected);
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
    const expected = mock.captain.books;
	t.is(JSON.stringify(actual), JSON.stringify(expected));
});

console.log("Testing Recursive Object at all level of deep")

test('1 level deep: Recursive Object -> strings', t => {
    const filter = "vehicles.name";
    const actual = jxplore.initDev(mock, filter);
    const expected = [ 'death Ragner', null, undefined ];
	t.is(JSON.stringify(actual), JSON.stringify(expected));
});

test('1 level deep: Recursive Object -> objects', t => {
    const filter = "vehicles.other";
    const actual = jxplore.initDev(mock, filter);
    const expected = [
        { lastbutnotleast: 'beautiful dragon', lastleast: 'beautiful cat' },
        { lastbutnotleast: null, lastleast: 'ugly cat' },
        { lastbutnotleast: 'beautiful dragon' }
    ];
	t.is(JSON.stringify(actual), JSON.stringify(expected));
});

test('2 level deep: Recursive Object -> objects', t => {
    const filter = "vehicles.other.lastleast";
    const actual = jxplore.initDev(mock, filter);
    const expected = [
        { lastleast: 'beautiful cat' },
        { lastleast: 'ugly cat' },
        { lastleast: undefined }
    ];
	t.is(JSON.stringify(actual), JSON.stringify(expected));
});