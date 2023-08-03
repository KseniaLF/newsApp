import { NewsSection } from "./components/NewsSection";
import { Toaster } from "react-hot-toast";

import { Routes, Route } from "react-router-dom";
import ArticlePage from "./components/ArticlePage";

function App() {
  return (
    <div className="flex flex-col items-center justify-between gap-16 py-4 min-h-screen mx-4">
      <main>
        <h1 className="text-3xl font-bold cursor-default p-3 text-center">
          News App
        </h1>

        <Routes>
          <Route path="/" element={<NewsSection />} />
          <Route path="/:id" element={<ArticlePage />} />
        </Routes>
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
