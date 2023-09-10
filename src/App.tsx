import './App.css';
import UrlShortenerForm from './components/UrlForm';
import UrlListTable from './components/UrlListTable';
import { Toaster } from 'sonner';

function App() {
  return (
    <div className="App">
      <Toaster richColors />
      <UrlShortenerForm />
      <UrlListTable />
    </div>
  );
}

export default App;
