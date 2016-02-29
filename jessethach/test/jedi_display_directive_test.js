var angular = require('angular');
var template = require('../app/templates/jedis/directives/jedi.html');

describe('jedi display directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('jedisApp'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive with an appropriate scope', () => {
    $httpBackend.when('GET', '/templates/jedis/directives/jedi.html').respond(200, template);
    var scope = $rootScope.$new();
    scope.newJedi = {name: 'test jedi', status: 'Dead', lightsaberColor: 'green'};
    var element = $compile('<jedi data-jedi-data="newJedi">This is a test</jedi>')(scope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('test jedi');
    expect(element.html()).toContain('Dead');
    expect(element.html()).toContain('green');
    expect(element.html()).toContain('This is a test');
  });

  it('should load the directive with an appropriate object', () => {
    $httpBackend.when('GET', '/templates/jedis/directives/jedi.html').respond(200, template);
    var scope = $rootScope.$new();
    var element = $compile('<jedi data-jedi-data="{name: \'test\', status: \'Alive\', lightsaberColor: \'blue\'}">inside directive</jedi>')(scope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('test');
    expect(element.html()).toContain('Alive');
    expect(element.html()).toContain('blue');
    expect(element.html()).toContain('inside directive');
  });
});
