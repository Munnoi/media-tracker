import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api, updateMediaItem, fetchYoutubeMeta } from "../services/api";

const EditMedia = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [metaLoading, setMetaLoading] = useState(false);

  const updateField = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // Load existing item
  useEffect(() => {
    const loadItem = async () => {
      try {
        const res = await api.get(`/media/${id}/`);
        setForm(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load item.");
      } finally {
        setLoading(false);
      }
    };
    loadItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateMediaItem(id, form);
      alert("Updated successfully!");
      navigate("/media");
    } catch (err) {
      console.error(err);
      alert("Failed to update.");
    } finally {
      setSaving(false);
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

      setForm((prev) => ({
        ...prev,
        media_type: media_type || prev.media_type,
        thumbnail_url: thumbnail_url || prev.thumbnail_url,
        title: title || prev.title,
      }));
    } catch (err) {
      console.error(err);
      alert("Could not fetch metadata.");
    } finally {
      setMetaLoading(false);
    }
  };

  if (loading || form == null)
    return <p className="text-slate-300">Loading item...</p>;

  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-semibold mb-4">Edit Media</h1>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        {/* Title */}
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

        {/* Media type */}
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

        {/* Source URL */}
        <div className="space-y-1">
          <label className="block text-slate-200">Source URL</label>
          <div className="flex gap-2">
            <input
              type="url"
              value={form.source_url || ""}
              onChange={(e) => updateField("source_url", e.target.value)}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
            />
            <button
              type="button"
              onClick={handleFetchYoutube}
              disabled={metaLoading}
              className="px-3 py-2 bg-indigo-600 text-white rounded-md text-xs hover:bg-indigo-500 disabled:opacity-60"
            >
              {metaLoading ? "..." : "YouTube"}
            </button>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="space-y-1">
          <label className="block text-slate-200">Thumbnail URL</label>
          <input
            type="url"
            value={form.thumbnail_url || ""}
            onChange={(e) => updateField("thumbnail_url", e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
          />
        </div>

        {/* Status */}
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

        {/* Progress */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-slate-200">Progress</label>
            <input
              type="number"
              value={form.progress}
              onChange={(e) => updateField("progress", Number(e.target.value))}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-slate-200">Total</label>
            <input
              type="number"
              value={form.total_units}
              onChange={(e) =>
                updateField("total_units", Number(e.target.value))
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-1">
          <label className="text-slate-200 block">Notes</label>
          <textarea
            rows="3"
            value={form.notes || ""}
            onChange={(e) => updateField("notes", e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 disabled:opacity-60"
        >
          {saving ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditMedia;
