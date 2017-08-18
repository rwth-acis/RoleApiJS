all: clean node web

clean:
	@echo "Cleaning"
	@rm -rf dist
	@mkdir dist

node:
	@echo "Building node library"
	npm run buildNode
	@cp lib/roleApiJS.js dist/

web:
	@echo "Building web library"
	npm run buildWeb
	@cp lib/roleApiJS.min.js dist/