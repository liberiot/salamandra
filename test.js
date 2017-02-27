
const expect = require('chai').expect
import parse, { getCrc, checkCrc } from './src/mqtt/parser';
import Liberiot from './src/liberiot';

//  (462F)1700270012703347000100010000030342

const STRING_TO_PARSE = '(412F)17002700127033470001000103000704E102B1022404';
const STRING_WITHOUT_MESURES = '(412F)1700270012703347000100010200030243';
const STRING_WITH_BAD_CRC = '(412F)17002700127033470001000103000704E102B1022407';

const PARSED_STRING = {
    uid: {
        full: '170027001270334700010001',
        id: '1700270012703347',
        code: '00010001'
    },
    rr: 65,
    ll: 47,
    cn: 3,
    fnc: 0,
    reg: 7,
    measures:
    [{ value: 1.25, endpoint: 'Voltage', type: 'V', error: false },
    { value: 18.9, endpoint: 'Temperature', type: 'C', error: false },
    { value: 66.02, endpoint: 'Temperature', type: 'F', error: false },
    {
        value: 292.05,
        endpoint: 'Temperature',
        type: 'K',
        error: false
    },
    { value: 54.8, endpoint: 'Humidity', type: '%', error: false }]
};

const PARSED_STRING_WITHOUT_MEASURES =
    {
        uid: {
            full: '170027001270334700010001',
            id: '1700270012703347',
            code: '00010001'
        },
        rr: 65,
        ll: 47,
        cn: 2,
        fnc: 0,
        reg: 3,
        measures: []
    };


describe('The parser module', () => {
    it('parse correctly the string ' + STRING_TO_PARSE, () => {
        let parsedString = parse(STRING_TO_PARSE);
        expect(parsedString).to.be.eql(PARSED_STRING);
    });

    it('parse correctly the string ' + STRING_WITHOUT_MESURES, () => {
        let parsedString = parse(STRING_WITHOUT_MESURES);
        expect(parsedString).to.be.eql(PARSED_STRING_WITHOUT_MEASURES);
    })

    it('check crc correctly', () => {
        let data = STRING_TO_PARSE.slice(6, STRING_TO_PARSE.length - 2);
        let crc = getCrc(STRING_TO_PARSE);
        let result = checkCrc(data, crc);
        expect(result).to.be.true;
    })

    it('check crc incorrectly', () => {
        let data = STRING_WITH_BAD_CRC.slice(6, STRING_WITH_BAD_CRC.length - 2);
        let crc = getCrc(STRING_WITH_BAD_CRC);
        let result = checkCrc(data, crc);
        expect(result).to.be.false;
    })

});

describe('The Liberiot class', () => {
    it('get mac correctly', () => {
        let liberiot = new Liberiot();
        return liberiot.getMac().then((mac) => {
            expect(mac).to.have.length(12);
        })
    })
})