import React, { useCallback, useMemo, useState, memo, useRef, useTransition } from "react";

const TodoItem = memo(function TodoItem({ todo, onToggle, onRemove }) {
    console.log("Rendering TodoItem: ", todo.text);
    return (
        <li key={todo.id}>
            <span
                style={{
                    textDecoration: todo.done ? "line-through" : "none",
                    cursor: "pointer"
                }}
                onClick={() => onToggle(todo.id)}
            >
                {todo.text}
            </span>
            <button onClick={() => onRemove(todo.id)}>❌</button>
        </li>
    )
})

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");
    const [filter, setFilter] = useState("");
    const [isPending, startTransition] = useTransition();

    // Derived values - recomputed only when todos change
    const completedCount = useMemo(
        () => { console.log('completedCount'); return todos.filter((t) => t.done).length },
        [todos]
    );
    // const completedCount = (() => { console.log('completedCount');
    //     return todos.filter((t) => t.done).length;
    // })();

    const pendingCount = useMemo(() => { console.log('pendingCount'); return todos.filter((t) => !t.done).length },
        [todos]
    )

    // ---------- addTodo ----------- //
    // Stable handlers - don't recreate on each render

    const addTodo = useCallback(() => {
        if (!text.trim()) return;
        setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
        setText(""); // clear input
    }, [text]);

    // or //

    /** below method has no dependencies now but this will add todos 2 times;
     * the double add happens because of how React batches state updates and how we’re “piggy-backing” off setText to also call setTodos. 
     * That updater is running twice in Strict Mode (React 18 dev feature) → so you see duplicates.

       The safe way is to not overload setText with side effects. Keep setTodos and setText
     */

    // const addTodo = useCallback(() => {
    //     setText((prevText) => {
    //         if (!prevText.trim()) return prevText; // do nothing if empty
    //         setTodos((prevTodos) => [
    //             ...prevTodos,
    //             { id: Date.now(), text: prevText, done: false }
    //         ]);
    //         return ""; // reset text
    //     });
    // }, []);

    /**to fix above issue,
     * read the input from a ref instead of state.
     */
    // const inputRef = useRef();

    // const addTodo = useCallback(() => {
    //     const value = inputRef.current.value.trim();
    //     if (!value) return;

    //     setTodos((prevTodos) => [
    //         ...prevTodos,
    //         { id: Date.now(), text: value, done: false }
    //     ]);

    //     inputRef.current.value = ""; // clear input manually
    // }, []);


    // ---------- addTodo ----------- //

    // ---------- toggleTodo ----------- //

    // const toggleTodo = useCallback((id) => {
    //     setTodos((prev) =>
    //         prev.map((todo) =>
    //             todo.id === id ? { ...todo, done: !todo.done } : todo)
    //     )
    // }, []);

    // or //

    const toggleTodo = useCallback((id) => {
        setTodos(() => todos.map((todo) =>
            todo.id === id ? { ...todo, done: !todo.done } : todo))
    }, [todos])

    // ---------- toggleTodo ----------- //

    /** `useCallback`
     * If you use functional updater form (setState(prev => ...)) → no need to depend on the state → [] is safe.
     * If you use the state directly (setState(todos.map(...))) → you must include todos in deps.
    */

    // removeTodo with useCallback
    const removeTodo = useCallback((id) => [
        setTodos((prev) => prev.filter((todo) => todo.id !== id))
    ], []);

    // removeTodo without useCallback

    // const removeTodo = (id) => {
    //     console.log('removeTodo')
    //     setTodos((prev) => prev.filter((todo) => todo.id !== id));
    // };

    // Apply search filter inside useMemo
    const filteredTodos = useMemo(() => {console.log(filter, 'filter')
        return todos.filter((todo) => todo.text.toLowerCase().includes(filter.toLowerCase()));
    }, [todos, filter]);

    const handleFilterChange = (e) => {
        const value = e.target.value;
        // useTransition makes typing smooth even if list is large
        startTransition(() => {
            setFilter(value);
        });
    }


    return (
        <div style={{ margin: "20px 0" }}>
            <h2>Todo List</h2>

            {/* Add Input */}
            <input type="text" value={text}
                placeholder="Enter todo"
                onChange={(e) => setText(e.target.value)}
            // ref={inputRef}
            />
            <button onClick={addTodo}>Add</button>

            {/* Search Input */}
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
                {/* {todos.map((todo) => ( 
                    // <TodoItem
                    //     key={todo.id}
                    //     todo={todo}
                    //     onToggle={toggleTodo}
                    //     onRemove={removeTodo}
                    // />

                    // <li key={todo.id}>
                    //     <span
                    //         style={{
                    //             textDecoration: todo.done ? "line-through" : "none",
                    //             cursor: "pointer"
                    //         }}
                    //         onClick={() => toggleTodo(todo.id)}
                    //     >
                    //         {todo.text}
                    //     </span>
                    //     <button onClick={() => removeTodo(todo.id)}>❌</button>
                    // </li>

                // ))}*/}
                {filteredTodos.map((todo) => (
                    <li key={todo.id}>
                        <span
                            style={{
                                textDecoration: todo.done ? "line-through" : "none",
                                cursor: "pointer",
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

export default TodoList;