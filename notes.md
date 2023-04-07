# Notes

- I think I want to work in Rust compiling to Web Assembly directly with no framework.
- Using the canvas directly, writing my own animation loop management stuff.
- Boxes for measurements on each axis of x, y, and z.
- Lines for the beams between the axes.
- The measurement only happens if the beams go to different places though.
- If the beams go to the same place they can't be distinguished, and the measurement doesn't disrupt the other ones.
- Rust ownership is going to make things complicated, in ways I don't currently understand.
- I may need to design the structure of data as I go.