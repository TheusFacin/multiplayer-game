const screen = document.getElementById('screen')
const context = screen.getContext('2d')
const currentPlayerId = 'player1'

// ================
// GAME
// ================

function createGame() {
  const state = {
    players: {
      'player1': { x: 1, y: 1 },
      'player2': { x: 5, y: 5 }
    },
    fruits: {
      'fruit1': { x: 3, y: 9 }
    }
  }

  function movePlayer(command) {
    console.log(`> Moving ${command.playerId} with ${command.keyPressed}\ngame.movePlayer()`)

    const acceptedMoves = {
      ArrowUp(player) {
        console.log('> Moving player Up\ngame.movePlayer().ArrowUp()')
        if (player.y - 1 >= 0) player.y--
      },
      ArrowDown(player) {
        console.log('> Moving player Down\ngame.movePlayer().ArrowDown()')
        if (player.y + 1 < screen.height) player.y++
      },
      ArrowLeft(player) {
        console.log('> Moving player Left\ngame.movePlayer().ArrowLeft()')
        if (player.x - 1 >= 0) player.x--
      },
      ArrowRight(player) {
        console.log('> Moving player Right\ngame.movePlayer().ArrowRight()')
        if (player.x + 1 < screen.width) player.x++
      }
    }

    const keyPressed = command.keyPressed
    const player = game.state.players[currentPlayerId]
    const moveFunction = acceptedMoves[keyPressed]
    
    if (moveFunction) moveFunction(player)

    return
  }

  return {
    movePlayer,
    state
  }
}

const game = createGame()

// ================
// INPUT
// ================

const keyboardListener = createKeyboardListener()
keyboardListener.subscribe(game.movePlayer)

function createKeyboardListener() {
  const state = {
    observers: []
  }

  function subscribe(observerFunction) {
    state.observers.push(observerFunction)
  }

  function notifyAll(command) {
    console.log(`> Notifying ${state.observers.length} observers\nkeyboardListener.notifyAll()`)

    for (const observerFunction of state.observers) {
      observerFunction(command)
    }
  }

  document.addEventListener('keydown', handleKeyDown)
  
  function handleKeyDown(e) {
    const keyPressed = e.key
    
    const command = {
      playerId: 'player1',
      keyPressed
    }
  
    notifyAll(command)
  }

  return {
    subscribe
  }
}

// ================
// RENDER
// ================

renderScreen()

function renderScreen() {
  clearScreen()
  
    for (const fruitId in game.state.fruits) {
      const fruit = game.state.fruits[fruitId]
      context.fillStyle = 'green'
      context.fillRect(fruit.x, fruit.y, 1, 1)
    }

  for (const playerId in game.state.players) {
    const player = game.state.players[playerId]
    context.fillStyle = 'black'
    context.fillRect(player.x, player.y, 1, 1)
  }

  requestAnimationFrame(renderScreen)
}

function clearScreen() {
  context.fillStyle = 'white'
  context.clearRect(0, 0, 10, 10)
}