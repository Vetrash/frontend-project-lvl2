install:
	npm ci

gendiff: 
	node bin/gendiff.js
	
publish:
	npm publish --dry-run

test:
	node --experimental-vm-modules node_modules/jest/bin/jest.js

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test-watch:
	npm test -- --watch

lint:
	npx eslint .