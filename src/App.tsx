import { NewsSection } from "./components/NewsSection";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="flex flex-col items-center justify-between gap-16 py-4 min-h-screen mx-4">
      <main>
        <h1 className="text-3xl font-bold cursor-default">News App</h1>

        <NewsSection />
      </main>

      <footer>
        Created by{" "}
        <a href="https://github.com/KseniaLF" target="blank">
          Ksenia
        </a>
      </footer>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
