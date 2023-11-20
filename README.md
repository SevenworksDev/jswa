# JSWA Library (Animate Browser Windows)

JSWA is a library that enables the creation and animation of browser windows using the `window.open` method.

## Functions

### `jswa.create(name, x, y, width, height)`

Creates a new window with the specified attributes.

- `name`: The name for the window.
- `x`: The initial horizontal position of the window.
- `y`: The initial vertical position of the window.
- `width`: The width of the window.
- `height`: The height of the window.

### `jswa.move(name, x, y, duration)`

Moves an existing window to a new position.

- `name`: The name of the window.
- `x`: The target horizontal position.
- `y`: The target vertical position.
- `duration`: The duration of the move animation in milliseconds.

### `jswa.resize(name, width, height)`

Resizes an existing window to new dimensions.

- `name`: The name of the window.
- `width`: The new width of the window.
- `height`: The new height of the window.

### `jswa.write(name, content)`

Writes HTML content to the body of an existing window.

- `name`: The name of the window.
- `content`: The HTML content to be written to the window body.

### `jswa.title(name, newTitle)`

Sets the title of an existing window.

- `name`: The name of the window.
- `newTitle`: The new title for the window.

### `jswa.close(name)`

Closes an existing window.

- `name`: The name of the window to be closed.

### `jswa.run(fileURL)`

Run a .jswa file.

- `fileURL`: The URL to a .jswa file.

## Example Usage

```javascript
// Create a window
jswa.create('window1', 100, 100, 400, 300);

// Set the title of the window
jswa.title('window1', 'New Window Title');

// Move the window
jswa.move('window1', 300, 200, 1000);

// Resize the window
jswa.resize('window1', 500, 400);

// Write HTML content to the window
jswa.write('window1', '<h1>Hello, Window!</h1>');

// Close the window after 3 seconds
setTimeout(() => jswa.close('window1'), 3000);
```
