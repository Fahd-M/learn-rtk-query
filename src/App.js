import TodoList from "./features/todos/TodoList"; // following redux folder structure

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;

//NOTE: will be using JSON Server - npm i json-server -g
// to start server: json-server --watch data/db.json --port 3500 
// Now CRUD operations supported 