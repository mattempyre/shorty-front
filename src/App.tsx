import './App.css';
import UrlShortenerForm from './components/UrlForm';
import UrlListTable from './components/UrlListTable';

function App() {
  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <UrlShortenerForm />
      <UrlListTable />
    </div>
  );
}

export default App;
