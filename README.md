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

## Setup and Run

1. Ensure you have Go installed on your machine.
2. Clone the repository.
3. Navigate to the project directory and run `go run main.go` to start the server.
4. Open `static/index.html` in your browser to start drawing.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
