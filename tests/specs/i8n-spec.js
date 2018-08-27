require('./../../src/tool/test-signature')(__filename);

var configIni = require('./../../index'),
    i8nConfig = configIni.load(__dirname + '/../props/i8n.ini');

describe('Reads object from a UTF 8 file', function () {
    it('UTF8 .ini file', function () {
        expect(configIni.encoding()).toBe('utf-8');
        expect(typeof i8nConfig).toBe('object');
        expect(i8nConfig.Japan.miyamoto_musashi).toBe('宮本武蔵');
        expect(i8nConfig.ME.salah_ad_din).toBe('صلاحالدينيوسفبنأيوب');
        expect(i8nConfig.Germany.gebhard_von_bluecher).toBe('Gebhard-Leberecht von Blücher Fürst von Wahlstatt');
    });
});
