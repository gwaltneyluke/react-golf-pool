import { faker } from '@faker-js/faker';

const getPlayers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from(Array(mockPlayerNames.length).keys())
              .map(_createMockPlayer))
    }, 2000);
  });
}

const getMockPlayers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from(Array(mockPlayerNames.length).keys())
              .map(_createMockPlayer))
    }, 2000);
  });
}

const _createMockPlayer = (index) => {
  return {
    position: index+1,
    name: mockPlayerNames[index],
    score: _getScoreString(faker.datatype.number({ min: -10, max: 20 }))
  }
}

const _getScoreString = (scoreInt) => {
  if (scoreInt > 0) {
    return `+${scoreInt.toString()}`;
  } else if (scoreInt < 0) {
    return scoreInt.toString();
  } else {
    return 'E';
  }
};

const mockPlayerNames = [
  'Rory McIlroy',
  'Collin Morikawa',
  'Viktor Hovland',
  'Justin Thomas',
  'Jordan Spieth',
  'Harold Varner III',
  'Abraham Ancer',
  'Jon Rahm',
  'Tiger Woods',
  'Xander Schauffele',
  'Paul Casey',
  'Cameron Smith',
  'Scottie Scheffler',
  'Bubba Watson',
  'Justin Rose',
  'Patrick Reed',
  'Bryson DeChambeau',
  'Shane Lowry',
  'Brooks Koepka',
  'Danny Willet',
  'Hideki Matsuyama',
  'Tony Finau',
  'Webb Simpson',
  'Dustin Johnson',
  'Will Zalatoris'
]

export {
  getPlayers,
  getMockPlayers,
  mockPlayerNames
}