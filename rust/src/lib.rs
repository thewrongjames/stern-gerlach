use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    pub fn alert(alert_string: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}
