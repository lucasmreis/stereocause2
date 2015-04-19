import Code from 'code';
import Lab from 'lab';
export var lab = Lab.script();

import server from '../';

const expect = Code.expect;

lab.experiment('contribute', function() {
  lab.test('should not accept value less than one dollar', function(done) {
    const options = {
      method: 'POST',
      url: '/api/contribute',
      payload: {
        email: 'aaa@aaa.com',
        cause: 'test',
        artist: 50,
        charity: 350,
        stereoCause: 350,
        notifyMe: true,
        shareMyEmail: false,
        stripeToken: '1q2w3e4r'
      }
    };

    server.inject(options, function(response) {
      const r = response.result;

      expect(response.statusCode).to.equal(400);
      expect(r.validation.keys).to.deep.equal(['artist']);

      done();
    });
  });

  lab.test('should not accept value less than one dollar', function(done) {
    const options = {
      method: 'POST',
      url: '/api/contribute',
      payload: {
        email: 'aaa@aaa.com',
        cause: 'test',
        artist: 350,
        charity: 350,
        stereoCause: 50,
        notifyMe: true,
        shareMyEmail: false,
        stripeToken: '1q2w3e4r'
      }
    };

    server.inject(options, function(response) {
      const r = response.result;

      expect(response.statusCode).to.equal(400);
      expect(r.validation.keys).to.deep.equal(['stereoCause']);

      done();
    });
  });

  lab.test('should not accept value less than one dollar', function(done) {
    const options = {
      method: 'POST',
      url: '/api/contribute',
      payload: {
        email: 'aaa@aaa.com',
        cause: 'insertTest',
        artist: 350,
        charity: 50,
        stereoCause: 350,
        notifyMe: true,
        shareMyEmail: false,
        stripeToken: '1q2w3e4r'
      }
    };

    server.inject(options, function(response) {
      const r = response.result;

      expect(response.statusCode).to.equal(400);
      expect(r.validation.keys).to.deep.equal(['charity']);

      done();
    });
  });

  lab.test('should not accept value less than one dollar', function(done) {
    const options = {
      method: 'POST',
      url: '/api/contribute',
      payload: {
        email: 'aaaaaa.com',
        cause: 'test',
        artist: 350,
        charity: 350,
        stereoCause: 350,
        notifyMe: true,
        shareMyEmail: false,
        stripeToken: '1q2w3e4r'
      }
    };

    server.inject(options, function(response) {
      const r = response.result;

      expect(response.statusCode).to.equal(400);
      expect(r.validation.keys).to.deep.equal(['email']);

      done();
    });
  });

  lab.test('should not accept value less than one dollar', function(done) {
    const options = {
      method: 'POST',
      url: '/api/contribute',
      payload: {
        email: 'aaa@aaa.com',
        cause: 'test',
        artist: 350,
        charity: 350,
        stereoCause: 350,
        notifyMe: true,
        shareMyEmail: false,
        stripeToken: undefined
      }
    };

    server.inject(options, function(response) {
      const r = response.result;

      expect(response.statusCode).to.equal(400);
      expect(r.validation.keys).to.deep.equal(['stripeToken']);

      done();
    });
  });

  lab.test.only('should contribute correctly', function(done) {
    const options = {
      method: 'POST',
      url: '/api/contribute',
      payload: {
        email: 'aaa@aaa.com',
        cause: 'test',
        artist: 350,
        charity: 350,
        stereoCause: 350,
        notifyMe: true,
        shareMyEmail: false,
        stripeToken: '1q2w3e4r'
      }
    };

    server.inject(options, function(response) {
      const r = response.result;
      console.log('RESULT', r);

      expect(response.statusCode).to.equal(200);

      done();
    });
  });
});