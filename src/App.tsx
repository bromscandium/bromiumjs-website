import { RouterView } from 'bromium';
import Header from './components/layouts/Header';

export default function App() {
  return (
    <>
      <Header />
      <RouterView />
    </>
  );
}
