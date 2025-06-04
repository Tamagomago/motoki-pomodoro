import Nav from './components/layout/Nav.tsx';
import Timer from '@/components/timer/Timer';
function App() {
  return (
    <div
      className={
        'h-screen w-screen bg-[url(./assets/bg-main.png)] bg-cover bg-no-repeat'
      }
    >
      <Nav />
      <div className={'flex h-screen w-screen items-center justify-center'}>
        <Timer />
      </div>
    </div>
  );
}

export default App;
