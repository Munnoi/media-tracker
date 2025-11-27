import { useState } from "react";
import { createMediaItem, fetchYoutubeMeta } from "../services/api";

const initialForm = {
  title: "",
  media_type: "youtube_video",
  source_url: "",
  thumbnail_url: "",
  status: "planning",
  notes: "",
  progress: 0,
  total_units: 0,
};

const AddMedia = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [metaLoading, setMetaLoading] = useState(false);

  const updateField = (field, value) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createMediaItem(form);
      alert("Saved!");
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      alert("Failed to save.");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchYoutube = async () => {
    if (!form.source_url) {
      alert("Enter a YouTube URL first.");
      return;
    }
    setMetaLoading(true);
    try {
      const res = await fetchYoutubeMeta(form.source_url);
      const { media_type, thumbnail_url, title } = res.data;
      setForm((f) => ({
        ...f,
        media_type: media_type || f.media_type,
        thumbnail_url: thumbnail_url || f.thumbnail_url,
        title: title || f.title,
      }));
    } catch (err) {
      console.error(err);
      alert("Could not fetch YouTube metadata.");
    } finally {
      setMetaLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-semibold mb-4">Add Media</h1>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <div className="space-y-1">
          <label className="block text-slate-200">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-slate-200">Media type</label>
          <select
            value={form.media_type}
            onChange={(e) => updateField("media_type", e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
          >
            <option value="youtube_video">YouTube Video</option>
            <option value="youtube_playlist">YouTube Playlist</option>
            <option value="movie">Movie</option>
            <option value="anime">Anime</option>
            <option value="tv_series">TV Series</option>
            <option value="book">Book</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-slate-200">
            Source URL (YouTube, etc.)
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={form.source_url}
              onChange={(e) => updateField("source_url", e.target.value)}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
            />
            <button
              type="button"
              onClick={handleFetchYoutube}
              disabled={metaLoading}
              className="px-3 py-2 bg-indigo-600 text-white rounded-md text-xs hover:bg-indigo-500 disabled:opacity-60"
            >
              {metaLoading ? "Fetching…" : "YouTube"}
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            Click “YouTube” to auto-fill thumbnail (video only).
          </p>
        </div>

        <div className="space-y-1">
          <label className="block text-slate-200">Thumbnail URL</label>
          <input
            type="url"
            value={form.thumbnail_url || ""}
            onChange={(e) => updateField("thumbnail_url", e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-slate-200">Status</label>
          <select
            value={form.status}
            onChange={(e) => updateField("status", e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
          >
            <option value="planning">Planning</option>
            <option value="in_progress">In progress</option>
            <option value="completed">Completed</option>
            <option value="dropped">Dropped</option>
          </select>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 space-y-1">
            <label className="block text-slate-200">
              Progress (episodes/pages)
            </label>
            <input
              type="number"
              min="0"
              value={form.progress}
              onChange={(e) => updateField("progress", Number(e.target.value))}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
            />
          </div>

          <div className="flex-1 space-y-1">
            <label className="block text-slate-200">Total units</label>
            <input
              type="number"
              min="0"
              value={form.total_units}
              onChange={(e) =>
                updateField("total_units", Number(e.target.value))
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-slate-200">Notes</label>
          <textarea
            rows="3"
            value={form.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm hover:bg-emerald-500 disabled:opacity-60"
        >
          {loading ? "Saving…" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default AddMedia;
