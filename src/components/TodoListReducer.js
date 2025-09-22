import React, { useCallback, useMemo, useReducer, useState, useTransition } from "react";

// Reducer function
function todoReducer(state, action) {
    console.log(state, action)
    switch (action.type) {
        case "ADD":
            return [...state, { id: Date.now(), text: action.text, done: false }];
        case "TOGGLE":
            return state.map((todo) =>
                todo.id === action.id ? { ...todo, done: !todo.done } : todo
            );
        case "REMOVE":
            return state.filter((todo) => todo.id !== action.id);
        default:
            return state;
    }
}

function TodoListReducer() {
    // useReducer replaces useState for todos
    const [todos, dispatch] = useReducer(todoReducer, []);
    const [text, setText] = useState("");
    const [filter, setFilter] = useState("");
    const [isPending, startTransition] = useTransition();

    // Derived values
    const completedCount = useMemo(
        () => todos.filter((t) => t.done).length, [todos]
    );
    const pendingCount = useMemo(
        () => todos.filter((t) => !t.done).length, [todos]
    );

    // stable callbacks
    const addTodo = useCallback(() => {
        if (!text.trim()) return; console.log(text, 'text')
        dispatch({ type: "ADD", text });
        setText("");
    }, [text])

    const toggleTodo = useCallback((id) => {
        dispatch({ type: "TOGGLE", id });
    }, [])

    const removeTodo = useCallback((id) => {
        dispatch({ type: "REMOVE", id })
    }, [])

    // Filtering with transition
    const filteredTodos = useMemo(() => {
        return todos.filter((todo) =>
            todo.text.toLowerCase().includes(filter.toLowerCase())
        );
    }, [todos, filter]);

    const handleFilterChange = (e) => {
        const value = e.target.value;
        startTransition(() => {
            setFilter(value);
        })
    };

    return (
        <div style={{ margin: "20px 0" }}>
            <h2>Todo List - Redux</h2>

            {/* Input */}
            <input
                type="text"
                value={text}
                placeholder="Enter todo"
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={addTodo}>Add</button>

            {/* Search */}
            <div style={{ marginTop: "10px" }}>
                <input
                    type="search"
                    placeholder="Search todos..."
                    value={filter}
                    onChange={handleFilterChange}
                />
                {isPending && <span style={{ marginLeft: "10px" }}>⏳ Filtering...</span>}
            </div>

            <p>
                ✅ Completed: {completedCount} | ⏳ Pending: {pendingCount}
            </p>

            <ul>
                {filteredTodos.map((todo) => (
                    <li key={todo.id}>
                        <span style={{
                            textDecoration: todo.done ? "line-through" : "none",
                            cursor: "pointer"
                        }}
                            onClick={() => toggleTodo(todo.id)}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => removeTodo(todo.id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoListReducer;