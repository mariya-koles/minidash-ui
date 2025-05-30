import ResponsiveGridLayoutComponent from './layout/ResponsiveGridLayout';
import './App.css';

function App() {
    return (
        <div className="app">
            <header className="app-header">
                <h1>MiniDash</h1>
            </header>
            <main className="app-main">
                <ResponsiveGridLayoutComponent />
            </main>
        </div>
    );
}

export default App;
