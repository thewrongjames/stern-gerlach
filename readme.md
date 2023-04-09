# Readme

(Hopefully eventually) an interactive simulator for something like the Stern-Gerlach experiment.

## Development Requirements

- This requires `wasm-pack`. I needed to install `wasm-pack` with `cargo install wasm-pack --no-default-features` to avoid segfaults. See https://github.com/rustwasm/wasm-pack/issues/1203#issuecomment-1374704720.
- `make serve` requires `python3` for its simple web server.
  - On arch this can be installed with `pacman -Syu python`.
- `make watch` uses `make serve` and also requires `inotifywait`.
  - On arch this can be installed with `pacman -Syu inotify-tools`.

## Development

- `make build` will build the project into the `build` directory.
- A web server then hosting this directory hosts application.
- `make serve` will run a development server.
- `make watch` will re-run `make build` whenever the contents of `website` or `rust/src` change.
- Running `make serve` and `make watch` at the same time allows for simply saving the code, and refreshing the browser to see updates.
- `make update` will update dependencies.
- You will still need to either disable caching or hard-reload to have the browser update the static files.

## Notes

- I think I want to work in Rust compiling to Web Assembly directly with no framework.
- Using the canvas directly, writing my own animation loop management stuff.
- Boxes for measurements on each axis of x, y, and z.
- Actually may need angle stuff too. I need to go through more old lectures...
- Lines for the beams between the axes.
- The measurement only happens if the beams go to different places though.
- If the beams go to the same place they can't be distinguished, and the measurement doesn't disrupt the other ones.
- Rust ownership is going to make things complicated, in ways I don't currently understand.
- I may need to design the structure of data as I go.
