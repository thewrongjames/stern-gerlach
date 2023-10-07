extern crate console_error_panic_hook;

use std::f64;
use std::panic;

use wasm_bindgen::prelude::*;

const CANVAS_ELEMENT_ID: &str = "canvas";

#[wasm_bindgen]
extern {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

// This is called when the web assembly module is initialised.
#[wasm_bindgen(start)]
pub fn start() {
    // Setup a panic hook to console.error, so I actually get the panic error
    // messages.
    panic::set_hook(Box::new(console_error_panic_hook::hook));

    log("Hello there.");

    // TODO: Get rid of all the seemingly very dangerous stuff being done here.

    let document = get_document();

    let canvas = document.get_element_by_id(CANVAS_ELEMENT_ID)
        .expect("canvas element not found");
    let canvas: web_sys::HtmlCanvasElement = canvas
        .dyn_into::<web_sys::HtmlCanvasElement>()
        .expect("could not cast found canvas element to HtmlCanvasElement");

    let canvas_context = canvas
        .get_context("2d")
        .expect("error getting canvas rendering context")
        .expect("could not get canvas rendering context")
        .dyn_into::<web_sys::CanvasRenderingContext2d>()
        .expect("blah");

    start_rendering_in_animation_frames(canvas_context)
}

fn get_document() -> web_sys::Document {
    let window = web_sys::window().expect("no global window exists");
    
    window.document().expect("no document exists on window")
}

fn start_rendering_in_animation_frames(
    canvas_context: web_sys::CanvasRenderingContext2d
) {
    render(canvas_context)
}

fn render(canvas_context: web_sys::CanvasRenderingContext2d) {
    canvas_context.begin_path();

    // Draw the outer circle.
    canvas_context
        .arc(75.0, 75.0, 50.0, 0.0, f64::consts::PI * 2.0)
        .unwrap();

    // Draw the mouth.
    canvas_context.move_to(110.0, 75.0);
    canvas_context.arc(75.0, 75.0, 35.0, 0.0, f64::consts::PI).unwrap();

    // Draw the left eye.
    canvas_context.move_to(65.0, 65.0);
    canvas_context
        .arc(60.0, 65.0, 5.0, 0.0, f64::consts::PI * 2.0)
        .unwrap();

    // Draw the right eye.
    canvas_context.move_to(95.0, 65.0);
    canvas_context
        .arc(90.0, 65.0, 5.0, 0.0, f64::consts::PI * 2.0)
        .unwrap();

    canvas_context.stroke();
}