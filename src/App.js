import logo from './logo.svg';
import './App.css';
import ThemeProvider from './components/ThemeProvider';
import ThemeSwitcher from './components/ThemeSwitcher';
import Counter from './components/Counter';
import TodoList from './components/TodoList';
import Clock from './components/Clock';
import BoxMeasure from './components/BoxMeasure';
import DeferredSearch from './components/DeferredSearch';
import TodoListReducer from './components/TodoListReducer';

function App() {
  return (
    <ThemeProvider>
      <div style={{ padding: "20px" }}>
        <h1>Mini Productivity Dashboard</h1>
        <ThemeSwitcher />
        <Counter />
        <TodoList />
        <Clock />
        <TodoListReducer />
        <BoxMeasure />
        <DeferredSearch />
      </div>
    </ThemeProvider>
  );
}

export default App;
