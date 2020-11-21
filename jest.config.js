module.exports = {
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
		'^.+\\.(js|jsx)$': 'babel-jest'
	},
	collectCoverageFrom: ['src/app/containers/Todo/Todo.tsx'],
	setupFilesAfterEnv: ['<rootDir>/config/setupTests.js'],
	moduleNameMapper: {
		'^app/(.*)$': '<rootDir>/src/app/$1',
		'\\.(css|scss)$': '<rootDir>/config/styleMock.js',
		'\\.(md)$': '<rootDir>/config/markdownMock.js'
	}
};
