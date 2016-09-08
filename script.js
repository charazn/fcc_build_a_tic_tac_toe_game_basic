$(document).ready(function() {
  var a, t, player_symbol, computer_symbol, turn, computer_choice, player_choice;
  var avail_boxes = [1,2,3,4,5,6,7,8,9];
  var computer_selected = [];
  var player_selected = [];
  var winning_condition = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]]; // Only 8 winning possibilities
  var check_win_computer;
  var winning_lines_computer = [];
  var check_win_player;
  var winning_lines_player = [];

  function check_against_winning_condition(gamer) {
    for (i = 0; i < winning_condition.length; i++) {
      for (j = 0; j < winning_condition[i].length; j++) {
        if (gamer === 'computer') {
          check_win_computer = winning_condition[i].every(function(elem) {
            return computer_selected.includes(elem);
          });
          if (check_win_computer) {
            winning_lines_computer.push(winning_condition[i]);
          }
        } else {
          check_win_player = winning_condition[i].every(function(elem) {
            return player_selected.includes(elem);
          });
          if (check_win_player) {
            winning_lines_player.push(winning_condition[i]);
          }
        }
      }
    }
  }

  function check_if_win(gamer) {
    if (gamer === 'computer') {
      if (winning_lines_computer.length !== 0) {
        $('#announcement').text('The computer wins!');
        $('#reset').text('PLAY AGAIN?');
        $('td').off('click');
        $('td').css('cursor', 'not-allowed');
      } else {
        turn = 'player';
        a = setTimeout(function(){
          $('#announcement').text('Your turn');
        }, 1000);
      }
    } else {
      if (winning_lines_player.length !== 0) {
        $('#announcement').text('You win!');
        $('#reset').text('PLAY AGAIN?');
        $('td').off('click');
        $('td').css('cursor', 'not-allowed');
      } else {
        turn = 'computer';
        t = setTimeout(computer_turn, 500);
      }
    }
  }

  function computer_turn() {
    $('#announcement').text('Computer'+"'"+'s turn');
    if (turn === 'computer') {
      if (computer_selected.length < 6) {
        if (avail_boxes.length === 1) {
          computer_choice = avail_boxes[0];
          computer_selected.push(computer_choice);
          avail_boxes.splice(avail_boxes.indexOf(computer_choice), 1); // Removes item from array, and returns array without the item
          $('#box'+computer_choice).text(computer_symbol);
          $('#box'+computer_choice).off('click');
          $('#box'+computer_choice).css('cursor', 'not-allowed');

          check_against_winning_condition('computer');

          if (winning_lines_computer.length !== 0) {
            $('#announcement').text('The computer wins!');
          } else {
            $('#announcement').text('It'+"'"+'s a draw!');
          }
          $('#reset').text('PLAY AGAIN?');
        } else {
          computer_choice = avail_boxes[Math.floor(Math.random() * avail_boxes.length)]; // To get a random item from an array
          $('#box'+computer_choice).text(computer_symbol);
          $('#box'+computer_choice).off('click');
          $('#box'+computer_choice).css('cursor', 'not-allowed');
          avail_boxes.splice(avail_boxes.indexOf(computer_choice), 1);
          computer_selected.push(computer_choice);

          check_against_winning_condition('computer');
          check_if_win('computer');
        }
      }
    }
  }

  $('#cross').click(function() {
    $('#choice_symbol').text('Your symbol');
    $('#cross').css({'background-color': 'green', 'color': 'white'});
    $('#cross').off('click');
    $('#cross').css('cursor', 'default');
    $('#circle').hide();
    $('#circle').off('click');
    $('#or').hide();
    $('td').css('cursor', 'pointer');
    player_symbol = 'X';
    computer_symbol = 'O';
    $('#announcement').css('visibility', 'visible');
    turn = 'computer';
    t = setTimeout(computer_turn, 1000);
  });

  $('#circle').click(function() {
    $('#circle').css({'background-color': 'green', 'color': 'white'});
    $('#circle').off('click');
    $('#circle').css('cursor', 'default');
    $('#cross').hide();
    $('#cross').off('click');
    $('#or').hide();
    $('td').css('cursor', 'pointer');
    player_symbol = 'O';
    computer_symbol = 'X';
    $('#announcement').css('visibility', 'visible');
    turn = 'computer';
    t = setTimeout(computer_turn, 1000);
  });

  $('#reset').click(function() {
    location.reload();
  });

  $('#box1, #box2, #box3, #box4, #box5, #box6, #box7, #box8, #box9').click(function(){
    if (!player_symbol) {
      $('#choice_symbol').css('color', 'orange');
    }
    if (turn === 'player') {
      $(this).text(player_symbol);
      player_choice = parseInt(this.id.substr(-1));
      $('#box'+player_choice).off('click');
      $('#box'+player_choice).css('cursor', 'not-allowed');
      player_selected.push(player_choice);
      avail_boxes.splice(avail_boxes.indexOf(player_choice), 1);

      check_against_winning_condition('player');
      check_if_win('player');
    }
  });
});
