const expect = require('chai').expect;
const td = require('testdouble');

const config = require('../src/config');

describe('Config', () => {

	describe('env()', () => {
		it('should return an object with all enviroment variables', () => {
			const env = config.env();
			expect(env).to.be.an('object');
			expect(env).to.deep.equal(process.env);
		});
	});

	describe('mocked', () => {

		beforeEach(() => {
			td.replace(config, 'env');
		});

		afterEach(() => {
			td.reset();
		});

		describe('get()', () => {
			it('will reflect mocking of env()', () => {

				td.when(config.env()).thenReturn(
					{ 'MY_TEST_VALUE': 'A' },
					{ 'MY_TEST_VALUE': 'B' }
				);
				expect(config.get('MY_TEST_VALUE')).to.equal('A');
				expect(config.get('MY_TEST_VALUE')).to.equal('B');

			});
		});

		describe('getMap()', () => {
			it('will return an object with multiple configs', () => {

				td.when(config.env()).thenReturn({
					'SOME_COOL_NICKS_Godoy': 'Dojjan',
					'COOL_NICKS_': 'molgan',
					'COOL_NICKS_alfred': 'affe',
					'COOL_NICKS_CARL': 'calle',
					'COOL_NICKSXYZ': 'ABC',
					'COOL_NICKS_olof': 'Olle',
					'COOL_NICKS_X': 'Mr. X',
					'TOTALLY_UNRELATED': '123',
					'COOL_NICK_Bengt': 'Bengan',
				});
				expect(config.getMap('COOL_NICKS')).to.deep.equal({
					'alfred': 'affe',
					'CARL': 'calle',
					'olof': 'Olle',
					'X': 'Mr. X'
				});

			});
			it('will return an empty object if no matches', () => {
				td.when(config.env()).thenReturn({
					'WHATEVER': 'yeah'
				});
				expect(config.getMap('COOL_NICKS')).to.deep.equal({});
			});
		});

		describe('getList()', () => {
			it('will return an array of multiple configs', () => {

				// starting with 0 should not work since it opens up
				// for duplicates (_01 and _1 being the same, but still not)

				td.when(config.env()).thenReturn({
					'SANTA_CLAUS_WISH_LIST_': 'Invalid format',
					'SANTA_CLAUS_WISH_LIST_X': 'Invalid. Numbers only.',
					'SANTA_CLAUS_WISH_LIST_-32': 'Negatives are also invalid.',
					'SANTA_CLAUS_WISH_LIST_100': 'Socks',
					'SANTA_CLAUS_WISH_LIST_0': 'Computer', // sorry, dude...
					'SANTA_CLAUS_WISH_LIST_5': 'World Peace',
					'SANTA_CLAUS_WISH_LISt_111': 'Wrong case.',
					'SANTA_CLAUS_WISH_LIST_1234567890': 'A nice js module'
				});
				expect(config.getList('SANTA_CLAUS_WISH_LIST')).to.deep.equal([
					'World Peace',
					'Socks',
					'A nice js module'
				]);
			});

			it('will return an empty array if no matches', () => {
				td.when(config.env()).thenReturn({
					'WHATEVER': 'yeah'
				});
				expect(config.getList('SANTA_CLAUS_WISH_LIST')).to.deep.equal([]);
			});
		});
	});

});
