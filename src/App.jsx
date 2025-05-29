import DashboardGrid from './layout/DashboardGrid';
import './App.css';

function App() {
    return (
        <div className="app">
            <header className="app-header">
                <h1>MiniDash</h1>
            </header>
            <main className="app-main">
                <DashboardGrid />
            </main>
        </div>
    );
}

export default App;
