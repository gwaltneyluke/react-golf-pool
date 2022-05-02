import { faker } from '@faker-js/faker';

import { mockPlayerNames } from './playerService';

const numberOfMockGents = 30;
const numberOfMockPicks = 10;

const getMockGents = () => {
	return Array(numberOfMockGents)
					.fill(null)
					.map(_createMockGent);
}

const _createMockGent = () => {
	return {
		name: faker.name.findName(),
		picks: Array(numberOfMockPicks)
						.fill(null)
						.map(_createMockPick)
	}
};

const _createMockPick = () => {
	return {
		playerName: mockPlayerNames[faker.datatype.number(mockPlayerNames.length - 1)],
		chips: faker.datatype.number(100)
	}
};

export {
	getMockGents
}