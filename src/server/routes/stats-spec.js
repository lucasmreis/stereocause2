import Code from 'code';
import Lab from 'lab';
export var lab = Lab.script();

import server from '../';

const expect = Code.expect;

lab.experiment('stats', function() {
  lab.test('should return correct stats', function(done) {
    const options = {
      method: "GET",
      url: "/api/stats/test"
    };

    server.inject(options, function(response) {
      const r = response.result;

      expect(response.statusCode).to.equal(200);

      expect(r.sumArtist).to.equal(450);
      expect(r.sumCharity).to.equal(450);
      expect(r.sumStereoCause).to.equal(450);
      expect(r.count).to.equal(3);

      done();
    });
  });

  lab.test('should return 404 for unknown cause stats', function(done) {
    const options = {
      method: "GET",
      url: "/api/stats/test-unknow"
    };

    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});