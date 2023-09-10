import { StickyNavbar } from './components/Nav';
import UrlShortenerForm from './components/UrlForm';
import UrlListTable from './components/UrlListTable';
import { Toaster } from 'sonner';

function App() {
  return (
    <main className="relative">
      <StickyNavbar />
      <Toaster richColors />
      <UrlShortenerForm />
      <UrlListTable />
    </main>
  );
}

export default App;
