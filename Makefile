test:
	mocha $$(find ./specs -name "*.js") -r should -R spec
