import { useEffect, useState } from "react";
import { getMediaItems, deleteMediaItem } from "../services/api";
import MediaCard from "../components/MediaCard";

const MediaList = () => {
  const [items, setItems] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);

  const loadItems = async () => {
    setLoading(true);
    try {
      const res = await getMediaItems();
      setItems(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load media items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await deleteMediaItem(id);
      setItems((prev) => prev.filter((it) => it.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete.");
    }
  };

  const filtered = items.filter((it) => {
    if (filterStatus !== "all" && it.status !== filterStatus) return false;
    if (filterType !== "all" && it.media_type !== filterType) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Your Media</h1>

      <div className="flex flex-wrap gap-3 text-sm">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-md px-3 py-1"
        >
          <option value="all">All statuses</option>
          <option value="planning">Planning</option>
          <option value="in_progress">In progress</option>
          <option value="completed">Completed</option>
          <option value="dropped">Dropped</option>
        </select>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-md px-3 py-1"
        >
          <option value="all">All types</option>
          <option value="youtube_video">YouTube Video</option>
          <option value="youtube_playlist">YouTube Playlist</option>
          <option value="movie">Movie</option>
          <option value="anime">Anime</option>
          <option value="tv_series">TV Series</option>
          <option value="book">Book</option>
          <option value="other">Other</option>
        </select>
      </div>

      {loading ? (
        <p className="text-slate-300 text-sm">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="text-slate-400 text-sm">
          No media yet. Add something from the “Add New” page.
        </p>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <MediaCard key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaList;
