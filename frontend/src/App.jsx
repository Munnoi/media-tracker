import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import MediaList from "./pages/MediaList";
import AddMedia from "./pages/AddMedia";
import EditMedia from "./pages/EditMedia";

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/media" replace />} />
          <Route path="/media" element={<MediaList />} />
          <Route path="/add" element={<AddMedia />} />
          <Route path="/edit/:id" element={<EditMedia />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
