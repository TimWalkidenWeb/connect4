'use strict';

define('web-app/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/connect-four.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/connect-four.js should pass ESLint\n\n139:9 - \'draw\' is assigned a value but never used. (no-unused-vars)\n168:4 - \'createjs\' is not defined. (no-undef)\n169:4 - \'createjs\' is not defined. (no-undef)\n172:9 - \'shake\' is not defined. (no-undef)\n173:8 - \'shake\' is not defined. (no-undef)\n192:21 - \'createjs\' is not defined. (no-undef)\n195:22 - \'createjs\' is not defined. (no-undef)\n277:33 - \'createjs\' is not defined. (no-undef)\n286:32 - \'createjs\' is not defined. (no-undef)\n301:8 - \'createjs\' is not defined. (no-undef)\n306:11 - \'shake\' is not defined. (no-undef)\n307:10 - \'shake\' is not defined. (no-undef)\n349:15 - \'createjs\' is not defined. (no-undef)\n371:20 - \'createjs\' is not defined. (no-undef)\n523:14 - \'createjs\' is not defined. (no-undef)\n524:14 - \'createjs\' is not defined. (no-undef)\n526:12 - \'createjs\' is not defined. (no-undef)\n527:12 - \'createjs\' is not defined. (no-undef)\n529:12 - \'createjs\' is not defined. (no-undef)');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });
});
define('web-app/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    Ember.run(application, 'destroy');
  }
});
define('web-app/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'web-app/tests/helpers/start-app', 'web-app/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };

  var resolve = Ember.RSVP.resolve;
});
define('web-app/tests/helpers/resolver', ['exports', 'web-app/resolver', 'web-app/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('web-app/tests/helpers/start-app', ['exports', 'web-app/app', 'web-app/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    var attributes = Ember.merge({}, _environment.default.APP);
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    return Ember.run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('web-app/tests/integration/components/connect-4-2player-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('connect-4-2player', 'Integration | Component | connect 4 2player', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "OiU8KrTX",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"connect-4-2player\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "U3E8qHSc",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"connect-4-2player\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('web-app/tests/integration/components/connect-four-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('connect-four', 'Integration | Component | connect four', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "ASId/eFv",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"connect-four\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "2Lr2RVo9",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"connect-four\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('web-app/tests/test-helper', ['web-app/tests/helpers/resolver', 'ember-qunit', 'ember-cli-qunit'], function (_resolver, _emberQunit, _emberCliQunit) {
  'use strict';

  (0, _emberQunit.setResolver)(_resolver.default);
  (0, _emberCliQunit.start)();
});
define('web-app/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/connect-4-2player-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/connect-4-2player-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/connect-four-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/connect-four-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
});
require('web-app/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
