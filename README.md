# Real-time Drawing Application

This is a real-time drawing application built using Go and JavaScript. It allows multiple users to draw on a canvas simultaneously in real-time.

## Technologies Used

- Go
- JavaScript
- Gorilla WebSocket (Go)
- Socket.IO (JavaScript)

## Project Structure

- `main.go`: This is the main Go file that sets up the WebSocket server and handles client connections and messages.
- `go.mod` and `go.sum`: These files handle the Go project dependencies.
- `static/app.js`: This is the main JavaScript file that handles the client-side drawing and WebSocket communication.

## How it Works

The application uses WebSockets to establish a real-time, bi-directional communication channel between the server (Go) and the client (JavaScript). When a user draws on the canvas, the client sends the drawing data to the server, which then broadcasts it to all connected clients. The clients then render the received drawing data on their own canvases.

## Video Showcase

https://youtu.be/XDzn24CQQ7A

## Setup and Run

1. Ensure you have Go installed on your machine.
2. Clone the repository.
3. Navigate to the project directory and run `go run main.go` to start the server.
4. Open `static/index.html` in your browser to start drawing.
5. The main features of this real-time drawing application are:
   
## Functionalities (more to be added)

1. **Drawing Tools**: Users can draw lines on the canvas with different colors and thicknesses. The color and thickness can be changed through the user interface.

2. **Clear Canvas**: Users have the option to clear the entire canvas.

3. **Responsive Canvas**: The canvas adjusts its size based on the size of the parent container, maintaining its aspect ratio.

4. **Preservation of Drawing State**: When the canvas is resized, the existing drawing data is stored and then restored to the new canvas size.

5. **Server-side Handling**: The server handles client connections and messages, broadcasting drawing data to all connected clients.

6. **Error Handling**: The application handles errors such as issues with upgrading to WebSocket, reading JSON from WebSocket, and writing JSON to WebSocket.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
