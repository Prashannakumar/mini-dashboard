import logo from './logo.svg';
import './App.css';
import ThemeProvider from './components/ThemeProvider';
import ThemeSwitcher from './components/ThemeSwitcher';
import Counter from './components/Counter';
import TodoList from './components/TodoList';
import Clock from './components/Clock';
import BoxMeasure from './components/BoxMeasure';
import DeferredSearch from './components/DeferredSearch';
import { Dashboard } from './pages/Dashboard';
import TodoListReducer from './components/TodoListReducer';
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="/todos" element={<TodoList />} />
      <Route path="/clock" element={<Clock />} />
      <Route path="/measure" element={<BoxMeasure />} />
      <Route path="/search" element={<DeferredSearch />} />
    </Routes>

    // <ThemeProvider>
    //   <div style={{ padding: "20px" }}>
    //     <h1>Mini Productivity Dashboard</h1>
    //     <ThemeSwitcher />
    //     <Counter />
    //     <TodoList />
    //     <Clock />
    //     <TodoListReducer />
    //     <BoxMeasure />
    //     <DeferredSearch />
    //   </div>
    // </ThemeProvider>
  );
}

export default App;
