# Notes

- Using the canvas directly, writing my own animation loop management stuff.
- Boxes for measurements on each axis of x, y, and z.
- Actually may need angle stuff too. I need to go through more old lectures...
- Lines for the beams between the boxes.
- The measurement only happens if the beams go to different places though.
- If the beams go to the same place they can't be distinguished, and the measurement doesn't disrupt the other ones.

## Vector Stuff

- https://www.typescriptlang.org/play?#code/MYGwhgzhAEBqCmwAuB7ATtA3gKGn6AHgFzQB2ArgLYBG8au+AniRTXdg3sCqREmuWToAFMTJVaaADTRm4tmgCUWTvjxIAFgEsIAOgLQAvIVVrNO3YyOzVAXw5qADiHIRhKTXQRC0JJI0d4FAAzaHMIRT8AoNDwlTU1NHgkcjRSMO09bl5+QVQ0YXD9aABqaA8NL0R8-RkiqzKKqp9LRTtse2wAegAqHtwe6ABBaAA3avRoLXTPaG50ABNpsCR4aAhHMGA1kIy1rZSwEGgljfBGeAW5sFJRyF1oACV4YLoYVAHoEBRgFa0eGCTELBCDJGADLrYeAERzoJBzcBQaAAER0zjAjG8+Wg0NWpAWMCxkxwajA1gATB0OL1+tBBiNxj4pjNKnMUItlqt1pttszoAB3bTADTlagAK2qMDASWg6O2CweAFkMbRoKqIL8QJdPjcrsDQfDaMF0GstIbEChKPApSi0eciWhdBCoTC4QjIDAAAooCBm-6kB04gh4glwCYYEn4ajWADMVOwwlI8H5trOGIdwgAjDJyYpFLpnK5E8nU+jMeHhOSZDG8xxshAUFrdN8AObCYsp1Fp8s+LM5vMFlxuJMp72+pD+jNV6A12vYevwsRdsuB4wj6Bjv08KfVtr1xvwZsoNsERRAA
- https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgGoQWA9lZBvAKGWOQA8AuZEAVwFsAjaIkgT0poaYF8CCZqQmYFhDI4AE3HpMOAM4AKGMCiyw07FErqcAGmSyMIqRg1aTOAJRmZuQiWRQIYalFF4KyJSrXmoAOlJkAGp9QxBjGwC9Nk9lVW1-FmDQhCMEvxYeHj4BIRF9BDgAGwgE+QA3X2sNPVlCorhNKjpGKCs0X3xmYkdnV3wPSsjAgCoC4sboyiGNDOQxuomoLN4EBtlZZAARYFkABwaWBK77AGIZnGqcXntUkFUoahsKqo6bCxP7EjAAC12-c6dAC8yAuUG6yGy9gA5k5Qb55B87F8ek4XKJfv9ATYIVDvlgAApYWTAMDCEBlJF44gHagKLC-aCUHb7Q4Jdosg5wI6dZEo3roqgQADu212XJ5zwkEQ0Ckxsj8YL0DJ+0EVvgsFlxN2+wFoEAUiwaTQ4rQ54rZvIh9gF-RAIrFrO5ZSNpQR8vVNlq9Uamu12TWcA2yCJJLJImOfOQ2NMbw0OuIdweTw0LxsVzanxRHpjOGQILB2ohsLA8OeSOtJFtGL+Ctz4Ps1OQ2E5lvL+CbtPpjKaodJ5PZlD74YpVpRqL6ontouHA4R0oSctrnpqyBVarBfsbCebeoN8iNjXYLWg7VnEbH4+rQpnxP7F+errKHqV42NW5IKyAA
- https://www.typescriptlang.org/play?#code/MYGwhgzhAEBqCmwAuB7ATtA3gKGn6AHgFzQB2ArgLYBG8au+AniRTXdg3sCqREmuWToAFMTJVaaADTRm4tmgCUWTvjxIAFgEsIAOgLQAvIVVrNO3YyOzVAXw5qADiHIRhKTXRIIhSlWrU0eCRyNFIyeAB3OERUNGFzPQMAamgPDTp9GUTLaFT0zMZFO2x7bFBIGAARHWcwRh84-3wAN1j0b3b6NVU+MCQtYGgAMzQUSkaRNt9O30USGog6hq7mgOggkLCI6MXlyfjpuKzoI-RLYrUytW5efkE40RYJOhk5VkllHHX1bT0zjDGUhRGK+URvS74a74ZyudyeNALWrgFZzJFLFEHNYBTahcJ7TFdXSjcYHBJ-XQA3SwtwFNCUrqKSF4exlCpQaAABRQEC0Ax4WO+rS6sziqlUtz4AjBYg+r1kzwUX1M+ByAOswOiZIIEJKqhp8IyiK5PL5WgFjJI3N5-NIgpVeFx201Jpt5rtXWEum9aqJBrpDLmum46AAJlpSP14BBmdBWRxyjw+IQNSCCfUyS6yQBGGQAJiZQA
- https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgGoQWA9lAMsAaxQG8AoZC5AcwjGQA8AKASgC5kQBXAWwCNpylGnQCeLdlz4DKyAA4AbTgGdGWMAAto7dJhz4ibNBmx5CEUgF9SpBPLhKlR3VGTBuCiNwjhHOk-pJBCnoJHn4oIOQRUKkIyIQsECUwKE5nRhCOMOgAGiiY8OZkMhkZDWAlADp6ZABeBkiy9QrKkTqoyKtIhWVVDS0nfzNDPz0zYsbKKFpOKBAOCAB3QZxGcqqagGpkNU0oarz11uRt3ehW5k7La1t7RwARCoU4EVGXNw8vHxXTIgmZABuxhw2mBcRkCSSKTSJkYQOcoOcRRKpQoR3hJnaGJwV26ihUZyg7EeSmerzBhhJZLe-1RyGmYFm8xAS2QVLs5PS6LBlR6BP6+2xUGYlxkVi6twcyAAClglMAwMBEjSPvJPN4wL4wQFaRQhYiTNYIYlkql0vqfsjJmjmlUhViwVcLEA

## Pan and Zoom

- The way I have previously done pan and zoom was to have a display canvas, and then another canvas that everything actually gets written to, and this other canvas is then scaled, offset, and drawn to the actual display canvas.
- I think in the ideal, infinitely scrollable version, you actually have tiling canvases, and you only draw the ones around what you are looking at now, and you create new ones and destroy old ones as required.
- I need to work out how much of this I do first, because certain bits may be annoying to add in later once a lot is established.
- I think that the main annoyance will be the difference between coordinates.
- Given this display canvas and "actually drawn to canvas(es)" system, there will be two kinds of coordinates. Display coordinates (which, like, the mouse position will be in).
- Indeed, this is coming up now because I want to track the mouse position, and doing so requires knowing if I am storing them in particular kind of coordinate system.
- I think provided that I had that set up, moving to having multiple tiling canvases might not be that big a deal?
- Or maybe I want to do it all first because it is a cool thing to do...
- I need a good name for these two coordinate systems.
  - Maybe display and position?