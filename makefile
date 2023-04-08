.DEFAULT_GOAL := build

rust/pkg: rust/src/*
	@echo "Building web assembly package."
	rm -rf rust/pkg
	cd rust && wasm-pack build --no-typescript --target web

build: rust/pkg website/*
	@echo "Building."
	rm -rf build
	mkdir build
	cp -r website/* build
	mkdir -p build/static/wasm
	cp rust/pkg/stern_gerlach.js build/static/wasm
	cp rust/pkg/stern_gerlach_bg.wasm build/static/wasm

.PHONY: serve, clean, watch

serve: build
	cd build && python3 -m http.server

clean:
	rm -rf build
	rm -rf rust/pkg

watch:
	while inotifywait -e modify -e create `find website` `find rust/src`; do \
		make build; \
	done;