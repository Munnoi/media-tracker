import { Link } from "react-router-dom";

const typeLabel = {
  youtube_video: "YouTube Video",
  youtube_playlist: "YouTube Playlist",
  movie: "Movie",
  anime: "Anime",
  tv_series: "TV Series",
  book: "Book",
  other: "Other",
};

const statusColors = {
  planning: "text-amber-300",
  in_progress: "text-sky-300",
  completed: "text-emerald-300",
  dropped: "text-rose-300",
};

const MediaCard = ({ item, onDelete }) => {
  return (
    <div
      className="
        group 
        relative 
        w-48 
        rounded-xl 
        overflow-hidden 
        cursor-pointer 
        bg-slate-900 
        border border-slate-800 
        shadow-md 
        transition-all 
        duration-300 
        hover:scale-105 
        hover:shadow-2xl 
        hover:border-slate-700
      "
    >
      {/* Thumbnail */}
      <img
        src={item.thumbnail_url}
        alt={item.title}
        className="
          w-full 
          h-28 
          object-cover 
          transition-all 
          duration-300 
          group-hover:brightness-75
        "
      />

      {/* Hover Overlay */}
      <div
        className="
          absolute 
          inset-0 
          bg-gradient-to-t 
          from-black/80 
          via-black/40 
          to-transparent 
          opacity-0 
          group-hover:opacity-100 
          transition-all 
          duration-300 
          p-3 
          flex 
          flex-col 
          justify-end
        "
      >
        {/* Title */}
        <h3 className="text-sm font-semibold text-white line-clamp-2">
          {item.title}
        </h3>

        {/* Type */}
        <p className="text-[11px] text-slate-300">
          {typeLabel[item.media_type]}
        </p>

        {/* Status */}
        <p className={`text-[11px] mt-1 ${statusColors[item.status]}`}>
          {item.status.replace("_", " ")}
        </p>

        {/* Notes preview */}
        {item.notes && (
          <p className="text-[10px] text-slate-400 line-clamp-2 mt-1 italic">
            “{item.notes}”
          </p>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center mt-3">
          <Link
            to={`/edit/${item.id}`}
            className="text-xs text-blue-300 hover:text-blue-200"
            onClick={(e) => e.stopPropagation()}
          >
            Edit
          </Link>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
            className="text-xs text-rose-300 hover:text-rose-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
