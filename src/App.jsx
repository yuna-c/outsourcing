import Router from './components/shared/Router';
import UserProvider from './UserProvider';

function App() {
  return (
    <div className="relative mx-auto Wrap">
      <UserProvider>
        <Router />
      </UserProvider>
    </div>
  );
}

export default App;
