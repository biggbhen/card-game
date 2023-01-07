const nameInput1 = document.querySelector('#player1-name');
const nameInput2 = document.querySelector('#player2-name');
let deckId = '';
fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then((res) => res.json())
  .then((data) => {
    deckId = data.deck_id;
  })
  .catch((err) => {
    console.log(`error${err}`);
  });

document
  .querySelector("input[type='submit']")
  .addEventListener('click', (e) => {
    const nameInput1Val = nameInput1.value;
    const nameInput2Val = nameInput2.value;
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
      .then((res) => res.json())
      .then((data) => {
        document.querySelector('.player1-card').src = data.cards[0].image;
        document.querySelector('.player2-card').src = data.cards[1].image;
        let player1Val = convertToVal(data.cards[0].value);
        let player2Val = convertToVal(data.cards[1].value);
        console.log(player1Val, player2Val);
        if (player1Val > player2Val) {
          document.querySelector(
            '.player1-win'
          ).innerText = `${nameInput1Val} : Wins!`;
          document.querySelector('.player2-win').innerText = '';
        } else if (player1Val < player2Val) {
          document.querySelector(
            '.player2-win'
          ).innerText = `${nameInput2Val} : Wins!`;
          document.querySelector('.player1-win').innerText = '';
        } else {
          document.querySelector('.player1-win').innerText = `Time for war!`;
          document.querySelector('.player2-win').innerText = `Time for war!`;
        }
      })
      .catch((err) => {
        console.log(`error${err}`);
      });

    function convertToVal(val) {
      if (val === 'ACE') {
        return 14;
      } else if (val === 'KING') {
        return 13;
      } else if (val === 'QUEEN') {
        return 12;
      } else if (val === 'JACK') {
        return 11;
      } else {
        return Number(val);
      }
    }

    e.preventDefault();
  });
