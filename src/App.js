import NoteCodeLogo from './assets/img/NoteCodeLogo.svg';
import HeroBackground from './assets/img/HeroBackground.png';

function App() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src={HeroBackground}
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute -top-72 flex flex-col justify-center items-center w-full h-full">
        <img className="w-28" src={NoteCodeLogo} alt="Logo" />
        <h2 className="font-semibold text-3xl mt-4">Create & Share</h2>
        <h1 className="font-semibold text-5xl mt-4">Your Code easily</h1>
      </div>
    </div>
  );
}

export default App;
