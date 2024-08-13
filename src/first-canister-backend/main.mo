import Array "mo:base/Array";

actor {
  var todos : [Text] = [];

  // to add a new to-do item
  public func addTodo(item: Text) : async Text {
    todos := Array.append<Text>(todos, [item]);
    return "Todo added: " # item;
  };

  // to get all to-do items
  public func getTodos() : async [Text] {
    return todos;
  };

  // to remove a to-do item by index
  public func removeTodo(index: Nat) : async Text {
    if (index >= todos.size()) {
      return "Invalid index!";
    };
    let removed = todos[index];

    let before = if (index > 0) {
      Array.subArray<Text>(todos, 0, index)
    } else {
      []
    };

    let after = if (index + 1 < todos.size()) {
      Array.subArray<Text>(todos, index + 1, todos.size())
    } else {
      []
    };

    todos := Array.append<Text>(before, after);
    return "Removed todo: " # removed;
  };
}
