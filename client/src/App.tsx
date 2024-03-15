import React from "react";
import Header from "./components/component/Header";
import Footer from "./components/component/Footer";
import Main from "./components/component/Main";
import AddModal from "./components/component/AddModal";
import { useState } from "react";

type Unit = "movie" | "review" | null;

function App() {
  const [modal, setModal] = useState<Unit>(null);
  return (
    <div className="h-screen flex flex-col">
      <AddModal modal={modal} setModal={setModal} />
      <Header setModal={setModal} />
      <div className="flex-grow">
        <Main />
      </div>
      <Footer />
    </div>
  );
}

export default App;
