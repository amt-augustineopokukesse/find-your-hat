const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field = [[]]) {//2d field constructor
    this.field = field;
    this.Xlocation = 0;
    this.Ylocation = 0;
    //Initial position before each game
    this.field[0][0] = pathCharacter;
  }

  print() {
    const fieldString = this.field.map(row => {
        return row.join('');
      }).join('\n');
    console.log(fieldString);
  }

  // Player move
  moveQuestion() {
    const playerMove = prompt('Which direction?').toUpperCase();
    switch(playerMove) {
      case 'U':
        this.Ylocation -=1;
        break;
      case 'D':
        this.Ylocation +=1;
        break;
      case 'L':
        this.Xlocation -=1;
        break;
      case 'R':
        this.Xlocation +=1;
        break;    
      default:
        console.log('Enter U, D, L or R.');
        this.moveQuestion();
        break;  
    }
  }

moveIsInBounds() {
    return (
      this.Xlocation >= 0 &&
      this.Xlocation < this.field[0].length &&
      this.Ylocation >= 0 &&
      this.Ylocation < this.field.length
    );
  }

  isHat() {
    return this.field[this.Ylocation][this.Xlocation] === hat;
  }

  isHole() {
    return this.field[this.Ylocation][this.Xlocation] === hole;
  }

  //Game play
  playGame() {
    let playing = true;
    while (playing) {
      this.print();
      this.moveQuestion();
      if (!this.moveIsInBounds()) {
        console.log('Moved out of Bounds! Retry');
        playing = false;
        break;
      } else if (this.isHole()) {
        console.log('Oops! you fell in a hole.');
        playing = false;
        break;
      } else if (this.isHat()) {
        console.log('Congratulations!! You found your hat.');
        playing = false;
        break;
      }
      // Update the current location on the map
      this.field[this.Ylocation][this.Xlocation] = pathCharacter;
    }
  }
// Generate Game Field
  static generateField(height, width, percentage=0.1) {
    const gameField = new Array(height).fill(0).map(x => new Array(width));
    //random holes
    for (let y=0; y < height; y++) {
      for (let x=0; x < width; x++) {
        const prob = Math.random();
        gameField[y][x] = prob > percentage ? fieldCharacter : hole;
      }
    }

    // Set the "hat" location
    const hatLocation = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    };
    // Make sure the "hat" is not at the starting point
    while (hatLocation.x === 0 && hatLocation.y === 0) {
      hatLocation.x = Math.floor(Math.random() * width);
      hatLocation.y = Math.floor(Math.random() * height);
    }
    gameField[hatLocation.y][hatLocation.x] = hat;
    return gameField;
  }
}

// instance
const tryField = new Field(Field.generateField(10, 10, 0.2));
tryField.playGame();
