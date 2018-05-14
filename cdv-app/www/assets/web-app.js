"use strict";



define('web-app/app', ['exports', 'web-app/resolver', 'ember-load-initializers', 'web-app/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('web-app/components/connect-four', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function deepClone(state) {
    /*
    Deep clone is called within minimax to save the game trees through the use
    of the loop and save it to an array. Then return them to the minimax.
    */

    var new_state = [];
    for (var idx1 = 0; idx1 < state.length; idx1++) {
      new_state.push(state[idx1].slice(0));
    }
    return new_state;
  }
  function check_game_winner(state) {
    /* check_game_winner is called by  check_winner when a counter is played
    */
    var patterns = [
    /* Winning Patterns */

    /* Vertical Pattern Wins */
    [[0, 0], [0, 1], [0, 2], [0, 3]], [[0, 1], [0, 2], [0, 3], [0, 4]], [[0, 2], [0, 3], [0, 4], [0, 5]], [[1, 0], [1, 1], [1, 2], [1, 3]], [[1, 1], [1, 2], [1, 3], [1, 4]], [[1, 2], [1, 3], [1, 4], [1, 5]], [[2, 0], [2, 1], [2, 2], [2, 3]], [[2, 1], [2, 2], [2, 3], [2, 4]], [[2, 2], [2, 3], [2, 4], [2, 5]], [[3, 0], [3, 1], [3, 2], [3, 3]], [[3, 1], [3, 2], [3, 3], [3, 4]], [[3, 2], [3, 3], [3, 4], [3, 5]], [[4, 0], [4, 1], [4, 2], [4, 3]], [[4, 1], [4, 2], [4, 3], [4, 4]], [[4, 2], [4, 3], [4, 4], [4, 5]], [[5, 0], [5, 1], [5, 2], [5, 3]], [[5, 1], [5, 2], [5, 3], [5, 4]], [[5, 2], [5, 3], [5, 4], [5, 5]], [[6, 0], [6, 1], [6, 2], [6, 3]], [[6, 1], [6, 2], [6, 3], [6, 4]], [[6, 2], [6, 3], [6, 4], [6, 5]],

    /* Horizontal Pattern Wins */
    [[0, 0], [1, 0], [2, 0], [3, 0]], [[1, 0], [2, 0], [3, 0], [4, 0]], [[2, 0], [3, 0], [4, 0], [5, 0]], [[3, 0], [4, 0], [5, 0], [6, 0]], [[0, 1], [1, 1], [2, 1], [3, 1]], [[1, 1], [2, 1], [3, 1], [4, 1]], [[2, 1], [3, 1], [4, 1], [5, 1]], [[3, 1], [4, 1], [5, 1], [6, 1]], [[0, 2], [1, 2], [2, 2], [3, 2]], [[1, 2], [2, 2], [3, 2], [4, 2]], [[2, 2], [3, 2], [4, 2], [5, 2]], [[3, 2], [4, 2], [5, 2], [6, 2]], [[0, 3], [1, 3], [2, 3], [3, 3]], [[1, 3], [2, 3], [3, 3], [4, 3]], [[2, 3], [3, 3], [4, 3], [5, 3]], [[3, 3], [4, 3], [5, 3], [6, 3]], [[0, 4], [1, 4], [2, 4], [3, 4]], [[1, 4], [2, 4], [3, 4], [4, 4]], [[2, 4], [3, 4], [4, 4], [5, 4]], [[3, 4], [4, 4], [5, 4], [6, 4]], [[0, 5], [1, 5], [2, 5], [3, 5]], [[1, 5], [2, 5], [3, 5], [4, 5]], [[2, 5], [3, 5], [4, 5], [5, 5]], [[3, 5], [4, 5], [5, 5], [6, 5]],

    /* Diagonal Pattern Wins */
    [[0, 3], [1, 2], [2, 1], [3, 0]], [[0, 4], [1, 3], [2, 2], [3, 1]], [[1, 4], [2, 3], [3, 2], [4, 1]], [[1, 3], [2, 2], [3, 1], [4, 0]], [[0, 5], [1, 4], [2, 3], [3, 2]], [[1, 4], [2, 3], [3, 2], [4, 1]], [[2, 3], [3, 2], [4, 1], [5, 0]], [[1, 5], [2, 4], [3, 3], [4, 2]], [[2, 4], [3, 3], [4, 2], [5, 1]], [[3, 3], [4, 2], [5, 1], [6, 0]], [[2, 5], [3, 4], [4, 3], [5, 2]], [[3, 4], [4, 3], [5, 2], [6, 1]], [[3, 5], [4, 4], [5, 3], [6, 2]], [[3, 0], [4, 1], [5, 2], [6, 3]], [[2, 0], [3, 1], [4, 2], [5, 3]], [[3, 1], [4, 2], [5, 3], [6, 4]], [[1, 0], [2, 1], [3, 2], [4, 3]], [[2, 1], [3, 2], [4, 3], [5, 4]], [[3, 2], [4, 3], [5, 4], [6, 5]], [[0, 0], [1, 1], [2, 2], [3, 3]], [[1, 1], [2, 2], [3, 3], [4, 4]], [[2, 2], [3, 3], [4, 4], [5, 5]], [[0, 1], [1, 2], [2, 3], [3, 4]], [[1, 2], [2, 3], [3, 4], [4, 5]], [[0, 2], [1, 3], [2, 4], [3, 5]]];
    /*
      The for loops below are used to loop over the patter and check to see if their
      is a winner. The loop works by checking that their is a state in the start of
      each pattern if their is it will loop through making sure each square in the
      pattern has the same state. If does pass back winner to check_winner, if not the
      loop is broken and starts again.
    */
    for (var pidx = 0; pidx < patterns.length; pidx++) {
      var pattern = patterns[pidx];
      var winner = state[pattern[0][0]][pattern[0][1]];
      if (winner) {
        for (var idx = 1; idx < pattern.length; idx++) {
          if (winner != state[pattern[idx][0]][pattern[idx][1]]) {
            winner = undefined;
            break;
          }
        }
        if (winner) {
          return winner;
        }
      }
    }
    /*
    The next stage is to check for a draw by looping through the each square making
    sure non of them are empty, if one is it returns undefined and the game carries
    on. However if no pass '' back to check_winner to display a message
    */
    var draw = true;
    for (var x = 0; x <= 2; x++) {
      for (var y = 0; y <= 2; y++) {
        if (!state[x][y]) {
          return undefined;
        }
      }
    }
    return '';
  }
  exports.default = Ember.Component.extend({
    /*
      The next four lines set out the global variables which need to be used within
      the game.
       Playing is used to tell the app when the game is running and not running
       Winner/drawing is undefined to make sure the winning text in the html does
      not appear until a winning or draw format has been placed into the game.
       desktop used to make sure the code now the difference between which device
      the user is using
    */
    playing: false,
    winner: undefined,
    draw: false,
    desktop: true,
    init: function init() {
      this._super.apply(this, arguments);
      createjs.Sound.registerSound("assets/click.wav", "place-marker");
      createjs.Sound.registerSound("assets/falling.mp3", "falling");
      var component = this;
      document.addEventListener("deviceready", function () {
        if (shake) {
          shake.startWatch(function () {
            component.send('start');
          });
        }
        component.set('desktop', false);
      }, false);
    },

    didInsertElement: function didInsertElement() {
      /*
        The following code from this point to the click_function creates the stage
        for connect four.
         The first three lines creates the variables for the stage:
        - stage is used to create a js stage
        - var board is used to create the new createjs Shape for the board
        - var graphics calls the board which the graphics
      */
      var stage = new createjs.Stage(this.$('#stage')[0]);

      //Draw the board
      var board = new createjs.Shape();
      var graphics = board.graphics;

      graphics.beginFill('#ffffff');
      /* Horizontal lines:
         Creates the seven Horizontal lines by first calling a variable graphics
         and assigns it a drawRect which is a line with the cordinates. The
         cordinates place the line in the correct place:
          First cordinate- is set to 0 to tell it to start at the top of board
         Second - sets out the gap between lines on virticle axes which has been
         set to have the difference of 50
         Third - sets where the line finish which is 294
         Fourth- is the thickness of the line which is 2
      */
      graphics.drawRect(0, 0, 294, 2);
      graphics.drawRect(0, 50, 294, 2);
      graphics.drawRect(0, 100, 294, 2);
      graphics.drawRect(0, 150, 294, 2);
      graphics.drawRect(0, 200, 294, 2);
      graphics.drawRect(0, 250, 294, 2);
      graphics.drawRect(0, 300, 294, 2);

      /* Horizontal lines:
         Creates the eight horizontal lines by first calling a variable graphics
         and assigns it a drawRect which is a line with the cordinates. The
         cordinates place the line in the correct place:
          First cordinate- is set to go up in 0  tell it to start at the top of
         board
         Second - is set to 0 so the line only goes horizontal
         Third - is the thickness of the line which is 2
         Fourth- set out where the line needs to finish which is the bottom of
         the board
      */
      graphics.drawRect(0, 0, 2, 300);
      graphics.drawRect(42, 0, 2, 300);
      graphics.drawRect(84, 0, 2, 300);
      graphics.drawRect(126, 0, 2, 300);
      graphics.drawRect(168, 0, 2, 300);
      graphics.drawRect(210, 0, 2, 300);
      graphics.drawRect(252, 0, 2, 300);
      graphics.drawRect(294, 0, 2, 300);

      /*
         Sets out the padding around the board:
         X = is the padding on around the left and right side of the board
         Y = is the padding on the top and bottom of the board
          Final calles the stage which deploys the board to be drawn
      */

      board.x = 30;
      board.y = 40;
      board.alpha = 0;
      this.set('board', board);
      stage.addChild(board);
      /* The next set of code creates the markers for the player to use:
         - The first step is to create the variable marker and create any array
         of x and o
         - The second set of code is within a for loop which loops over the graphics
          21 times to create 21 x and o which is the correct amount for all the
          squares be filled
         - within the for loop we create a varibale called circleMarker which calles
         us the createjs.Shape to be able to create the circle:
           - beginStroke is used to input the colour of the circle
           - setStrokeStyle is the thickness of the circle
           - drawCircle creates the size of the circle which is 9
           - last is to set it the visablity to false so they dont appear until
           need to be used
           - The next is it add is to the stage and then push the circle
       This is all repeated to create the second player counters
       */

      var markers = {
        'x': [],
        'o': []
      };

      for (var x = 0; x < 21; x++) {
        var circleMarker = new createjs.Shape();
        graphics = circleMarker.graphics;
        graphics.beginStroke('#66ff66');
        graphics.setStrokeStyle(10);
        graphics.drawCircle(0, 0, 9);
        circleMarker.visible = false;
        stage.addChild(circleMarker);
        markers.o.push(circleMarker);

        var crossMarker = new createjs.Shape();
        graphics = crossMarker.graphics;
        graphics.beginStroke('#ffffff');
        graphics.setStrokeStyle(10);
        graphics.drawCircle(0, 0, 9);
        crossMarker.visible = false;
        stage.addChild(crossMarker);
        markers.x.push(crossMarker);
      }

      this.set('markers', markers);
      this.set('stage', stage);

      //Update the drawing
      // stage.update()
      createjs.Ticker.addEventListener("tick", stage);
    },

    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      if (shake) {
        shake.stopWatch();
      }
    },

    click: function click(ev) {
      /*
      The first if statement is is used to call the playing and winner variables
      The second variable sets out the board where the user can click within which is
      30 by 340 on x axies and y is 40 by 340 axiex. Within the if stament is :
       - var x which sets out the place for the counter on the x axies
       - The next part is to create a y variable which is snumber of rows
       - we also call in the state to find out which square are undefined and which are not
       - While loop is used to take the y position for the counter and keep moving the counter down
       by 1 until it finds a square which has been taken and place it above it
       */
      var component = this;
      if (component.get('playing') && !component.get('winner')) {
        if (ev.offsetX >= 30 && ev.offsetY >= 40 && ev.offsetX < 340 && ev.offsetY < 340) {
          var x = Math.floor((ev.offsetX - 40) / 42);
          var y = 5;
          var state = component.get('state');
          while (state[x][y] == 'x' || state[x][y] == 'o') {
            y = y - 1;
          }

          /* The next if stament is used to take the cordinate from above and
             place it into the square:
             - The if statement will break the code if their is a counter in the first row
              and make sure the user cant put another one in their
             - The next part is calls the state to be changed to x
             - The next line calls the move to let them now it x move and the second is
             to call the look of the marker
             - The maker is then set to visible and should appear on the screen which is
             followed by setting the offest of the markers
             - The next is to calle the check_winner to see if the user has won or not
             - The next line is it updates the stage to apply marker and add text if the
             user has won
             - The final component is used to increase the move count by done
                  */

          if (y >= 0) {
            createjs.Sound.play("place-marker");
            state[x][y] = 'x';
            var move_count = component.get('moves')['x'];
            var marker = component.get('markers')['x'][move_count];
            marker.visible = true;
            marker.x = 50 + x * 42;
            marker.y = 70 + y * 50;

            component.check_winner();
            component.get('stage').update();
            component.get('moves')['x'] = move_count + 1;

            /* The next set of code is used create computer player-
                - The set time out creates a break between the player and computer
                - The code after is the same as the coce before but for the computer player
                - Final part is the 500 which is the time given between the computer and human
                player
            */

            setTimeout(function () {

              if (!component.get('winner') && !component.get('draw')) {
                createjs.Sound.play("place-marker");
                var move = component.computer_move(state);

                state[move.x][move.y] = 'o';
                marker = component.get('markers')['o'][move_count];
                move_count = component.get('moves')['o'][move_count];

                marker.visible = true;

                marker.x = 50 + move.x * 42;
                marker.y = 70 + move.y * 50;
                component.get('moves')['o'] = move_count + 1;

                component.get('stage').update();

                component.check_winner();
              }
            }, 500);
          }
        }
      }
    },

    check_winner: function check_winner() {
      /* check_winner is called by the click function after each moves
      The function first calls the check_game_winner to find a draw or a win, if
      it does a winner is passed by with the name of the counter, if not a draw is returned
      with the symbol ''. If undefined is returned then it means the game carrys on.
      */
      var state = this.get('state');
      var winner = check_game_winner(state);
      if (winner !== undefined) {
        if (winner === '') {
          this.set('draw', true);
        } else {
          this.set('winner', winner);
        }
      }
    },

    computer_move: function computer_move(state) {
      function minimax(state, limit, player) {
        /* Is called by the move function after the user has placed a counter
          The foor loops are used to find the squares which are empty and recgonise it
          as a possible move. The move is created by take the co-ordinates and passing it
          to the deepClone to make the possible result of using this move.
        */
        var moves = [];
        if (limit > 0) {
          for (var idx2 = 5; idx2 >= 0; idx2--) {
            for (var idx1 = 0; idx1 <= 6; idx1++) {
              if (state[idx1][idx2] === undefined) {
                var move = {
                  x: idx1,
                  y: idx2,
                  state: deepClone(state),
                  score: 0
                };
                move.state[idx1][idx2] = player;
                /* Once the deepClone pass back the move it is ran through
                the check_winner to create a score, if computer can win from this
                move it is set to 1000, if the user can win it is set to -1000
                */
                if (limit === 1 || check_game_winner(move.state) !== undefined) {
                  if (check_game_winner(move.state) !== undefined) {
                    var winner = check_game_winner(move.state);
                    if (winner === 'o') {
                      move.score = 1000;
                    } else if (winner === 'x') {
                      move.score = -1000;
                    }
                  }

                  /* Else it use anotehr loop and if statments to come up with a score
                  of the what can happen after the move has taken place. Then it will push the
                  move back to the computer_move to register the chosen possible moves
                  */
                } else {
                  move.moves = minimax(move.state, limit - 1, player == 'x' ? 'o' : 'x');
                  var score = undefined;
                  for (var idx3 = 0; idx3 < move.moves.length; idx3++) {
                    if (score === undefined) {
                      score = move.moves[idx3].score;
                    } else if (player === 'x') {
                      score = Math.max(score, move.moves[idx3].score);
                    } else if (player === 'o') {
                      score = Math.min(score, move.moves[idx3].score);
                    }
                  }
                  move.score = score;
                }
                moves.push(move);
              }
            }
          }
        }
        return moves;
      }

      /* This is used to find the avaliable place for the computer be able to
        place a counter.
        - The for loop, is used to loop over the coloumns and row to find all
        the possible place to add the counters
        - The var move the place to set the cordinates for the counter and adds a score.
         - then push the move to where counter needs to be placed
        - next it loop over the possible score to find the highest and pass the move
        - the max score is set and so the move it then use a if to compare the different score
        - the next part get the cordinates of the score and pass it back to place the counter
      */

      var moves = minimax(state, 2, 'o');
      var max_score = undefined;
      var move = undefined;
      for (var idx = 0; idx < moves.length; idx++) {
        if (max_score === undefined || moves[idx].score > max_score) {
          max_score = moves[idx].score;
          move = {
            x: moves[idx].x,
            y: moves[idx].y
          };
        }
      }
      return move;
    },

    actions: {
      /* Action is used to start the game:
       - first sets the playing to true and make sure win and draw is undefined
       - also sets the state which make sure all the squares are undefined at the Start
       of the game.
       - then loops over all the possible counter and make sure all the counter are not visuable to
       the user
       - finally refresh the whole of the stage which will remove the counter and set the game back
       the start.
       */

      start: function start() {
        var board = this.get('board');
        board.alpha = 0;
        //createjs.Tween.get(board).to({alpha: 1}, 1000)
        if (this.get('playing')) {
          var markers = this.get('markers');
          for (var idx = 0; idx < 5; idx++) {
            createjs.Tween.get(markers.x[idx]).to({ y: 600 }, 500);
            createjs.Tween.get(markers.o[idx]).to({ y: 600 }, 500);
          }
          createjs.Sound.play("falling");
          createjs.Tween.get(board).wait(500).to({ alpha: 1 }, 1000);
        } else {
          createjs.Tween.get(board).to({ alpha: 1 }, 1000);
        }
        this.set('playing', true);
        this.set('winner', undefined);
        this.set('draw', undefined);
        this.set('state', [[undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined]]);
        this.set('moves', { 'x': 0, 'o': 0 });
        this.set('player', 'x');
        var call_markers = this.get('markers');
        for (var idx4 = 0; idx4 < 21; idx4++) {
          call_markers.x[idx].visible = false;
          call_markers.o[idx].visible = false;
        }
        // this.get('stage').update();
      }
    }

  });
});
define('web-app/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('web-app/helpers/app-version', ['exports', 'web-app/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('web-app/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('web-app/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('web-app/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'web-app/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _config$APP = _environment.default.APP,
      name = _config$APP.name,
      version = _config$APP.version;
  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('web-app/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('web-app/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('web-app/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('web-app/initializers/export-application-global', ['exports', 'web-app/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('web-app/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('web-app/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('web-app/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("web-app/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('web-app/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('web-app/router', ['exports', 'web-app/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('game', { path: '/' });
  });

  exports.default = Router;
});
define('web-app/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("web-app/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "7N4DFQlT", "block": "{\"symbols\":[],\"statements\":[[6,\"section\"],[9,\"id\",\"app\"],[7],[0,\"\\n  \"],[6,\"header\"],[7],[0,\"\\n    \"],[6,\"h1\"],[7],[4,\"link-to\",[\"game\"],null,{\"statements\":[[0,\"Connect Four\"]],\"parameters\":[]},null],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"article\"],[7],[0,\"\\n    \"],[1,[18,\"outlet\"],false],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"footer\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"float-left\"],[7],[0,\"\\n      Powered by Ember, shake to start and restart the game\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "web-app/templates/application.hbs" } });
});
define("web-app/templates/components/connect-four", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+KDpk1oU", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"if\",[[19,0,[\"playing\"]]],null,{\"statements\":[[4,\"if\",[[19,0,[\"winner\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[7],[0,\"\\n      \"],[1,[18,\"winner\"],false],[0,\" won!\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[19,0,[\"draw\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[7],[0,\"we'll call it a draw\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[19,0,[\"desktop\"]]],null,{\"statements\":[[0,\"  \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"start\"]],[7],[0,\"restart\"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[19,0,[\"desktop\"]]],null,{\"statements\":[[0,\"      \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"start\"]],[7],[0,\"Start\"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]}],[0,\"\\n\\n\"],[6,\"canvas\"],[9,\"id\",\"stage\"],[9,\"width\",\"380\"],[9,\"height\",\"380\"],[7],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "web-app/templates/components/connect-four.hbs" } });
});
define("web-app/templates/game", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "gAL+yVfY", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[0,\"\\n\\n\"],[1,[18,\"connect-four\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "web-app/templates/game.hbs" } });
});


define('web-app/config/environment', ['ember'], function(Ember) {
  var prefix = 'web-app';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("web-app/app")["default"].create({"name":"web-app","version":"0.0.0+f66220c3"});
}
//# sourceMappingURL=web-app.map
