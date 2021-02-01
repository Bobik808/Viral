//* ACTIONS


//* Player actions (within "Turn" function)


// its the players turn
// update possible actions
// set actionpoint counter = 4
// ...wait till action taken by player (defined by UI event handlers)
// every action then decrements the actionpoint
// then updates possible actions OR triggers next phase (board actions)

function playerActions(currentPlayer) {

  //? Where do we store actionPoints? in state?

  let actionPoints = 4;
  while (actionPoints) {

  }
}



//* Possible Actions (within "playerActions" function)

function updatePossibleActions(currentPlayer) {

  //* STATE CHECK TO DETERMINE WHAT ACTIONS ARE POSSIBLE
  //? These checks will be send to UI to determine what actions are made available
  // check players location
  //  - list connections (move)
  // check status of curent location
  //  - are there misinfo markers there? (clear up)
  //  - is another player there? (share)
  //  - is "home" included? (debunk 1/2)
  // check cards in hand
  //  - is current location included (logoff)
  //  - is current location included (logon)
  //  - are there 4 of any one colour (debunk 2/2)
  //? The above checks will activate state on the sources, which will trigger appropriate choices displayed by UI on hover
    
  const location = currentPlayer.currentSource;
  const adjacents = getConnections(location.name);
  // create list of locations to update the canMove boolean
  //todo create list in format that can update state, ie [Gamestate.sources[index].canMove = true, ...] 
  // check markers
  const redMisinfo = location.markers.filter((marker) => marker.color === 'red').length;
  const blueMisinfo = location.markers.filter((marker) => marker.color === 'blue').length;
  const yellowMisinfo = location.markers.filter((marker) => marker.color === 'yellow').length;
  //todo create object to add to state to update the current location's "canClearRed/Blue/Yellow" properties, ie: [Gamestate.sources[index].canClearBlue = true, ...]
  // check if another player is there
  const otherPlayers = Gamestate
    .players
    .filter((player) => player.name !== currentPlayer.name)
    .filter((otherPlayer) => otherPlayer.currentSource === location);
  //todo update canShare of current source eg [Gamestate.sources[index].canShare = otherPlayers]
  // check if we are at home (debunk 1/2)
  const atHome = location.name === "crazy dave's house";
  // check hand contains current location (logoff)
  const canLogOff = currentPlayer.cards
    .filter((card) => card.source.name === location.name)
    .length; // make conditional?
  //todo update canLogOff state of ALL sources other than current, ie: [Gamestate.sources[index].canLogOff = true, ...]
  // check hand contains other location (logon)
  const logonSourceCards = currentPlayer.cards
    .map((card) => card.source.name)
    .filter((name) => name !== location.name);
  //todo update canLogOn of all sources listed in logonSourceCards
  // check hand contains 4 of any colour (debunk 2/2)
  const debunkable = []
  if (atHome) {
    if (
      currentPlayer.cards
      .filter((card) => card.source.color === 'red')
      .length >= 4) {
        debunkable.push('red')
      };
    if (
      currentPlayer.cards
      .filter((card) => card.source.color === 'blue')
      .length >= 4) {
        debunkable.push('blue')
      };
    if (
      currentPlayer.cards
      .filter((card) => card.source.color === 'yellow')
      .length >= 4) {
        debunkable.push('yellow')
      };
  };
  //todo update current location canDebunk with debunkable array
  //* UPDATE ENTIRE STATE WITH ALL ABOVE CHANGES
  //todo return/dispatch state
}


//* for getting connection from source location (helper function) 

function getConnections(location) {
  const connections = Object.entries(Connections)
  .filter(([key]) => key === location)
  .map(([_, value]) => value)
  return connections;             
}


//* Move player action

//? called as event handler, so will be passed location to move to

function movePlayer(player, location) {
  // set players location to "location"
  //todo update state like [player.currentSource = location]
  // decrement actionscount
  //todo update actionCount state
  if (actionCount) {
    updatePossibleActions(player)
  } 
}

//* Clear marker action

//? called as event handler, will be passed colour of chosen marker

function clear(player, markerColor) {
  //? check if any colours/misinformations have been debunked
  // remove marker from 
  //todo update state like [player.currentSource = location]
  // decrement actionscount
  //todo update actionCount state
  if (actionCount) {
    updatePossibleActions(player)
  } 
}