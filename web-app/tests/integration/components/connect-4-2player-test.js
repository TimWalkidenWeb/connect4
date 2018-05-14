import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('connect-4-2player', 'Integration | Component | connect 4 2player', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{connect-4-2player}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#connect-4-2player}}
      template block text
    {{/connect-4-2player}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
