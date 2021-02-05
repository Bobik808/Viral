//? put obljects here as we use/store stuff

//Time to save the world!!

export interface Turn {
  player: Player;
  movesLeft: number;
}// do we need a turn export interface to keep track of how many actions left etc?

//* STATE

export interface Gamestate {
  sources: Source[];
  players: Player[];
  spreadLevel: number; // 0,1,2 or 3
  chaosMeter: number;
  misinformation: {
    community: Misinformation,
    social: Misinformation,
    relations: Misinformation
  };
  connectionDeck: Card[];
  misinformationDeckActive: Card[];
  misinformationDeckPassive: Card[];
  turnMovesLeft: number;
  dealHistory: number; //? this is needed for the discardCard funtion to return back to where it was called from, and is the noOfCards parameter passed to boardActions
  gameWon: boolean;
  gameLost: boolean;
  received: boolean;
}

export interface Player {
  name: string;
  id: string;
  cards: Card[];
  cardHandOverflow: boolean;
  isCurrent: boolean;
  pawnColor: string;
  currentSource: string;
}

export interface Source {
  name: string;
  misinfoType: string;
  markers_community: number;
  markers_social: number;
  markers_relations: number;
  canMove: boolean;
  canLogOn: boolean;
  canLogOff: boolean;
  canClearCommunity: boolean;
  canClearSocial: boolean;
  canClearRelations: boolean;
  canShare: Player[];
  canDebunk: string[];
}

export interface Misinformation {
  name: string;
  debunked: boolean;
  markersLeft: number;
}


export interface Card {

  cardType: string; //? 'connection', 'minformation' or 'viral'

  sourceName: string | null;
  misinfoType: string | null;
}

//* CLIENT

export interface Connection {
  name: string;
  connections: string[];
  category: string;
}
