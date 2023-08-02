import { NewsList } from "./components/NewsList";

function App() {
  return (
    <div className="flex flex-col items-center justify-between py-4 min-h-screen mx-4">
      <main>
        <h1 className="text-3xl font-bold cursor-default">News App</h1>

        <NewsList />
      </main>

      <footer>
        Created by{" "}
        <a href="https://github.com/KseniaLF" target="blank">
          Ksenia
        </a>
      </footer>
    </div>
  );
}

export default App;
