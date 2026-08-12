import React, { useState } from "react";
import { motion } from "motion/react";
import { ThumbsUp, MessageSquare, Sparkles, Send, Star, ShieldCheck, PenTool } from "lucide-react";
import { useCommunityContext } from "../../context/CommunityContext";
import { GAMES_DATA } from "../../data/games";

export default function CommunityHub() {
  const { posts, likePost, addGameReview } = useCommunityContext();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState(GAMES_DATA[0].id);
  const [authorName, setAuthorName] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !reviewComment) return;

    addGameReview(selectedGameId, {
      user: authorName,
      rating,
      comment: reviewComment,
    });

    setAuthorName("");
    setReviewComment("");
    setShowReviewForm(false);
  };

  return (
    <section className="pt-32 pb-24 px-6 lg:px-16 min-h-screen bg-[#0a0a0f] relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#1e1e2e] pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-[#a855f7] mb-2">
              <Sparkles className="w-4 h-4" /> Developer & Player Syndicate
            </div>
            <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tighter uppercase italic text-white">
              Community <span className="text-[#a855f7] glow-text-purple">Hub</span>
            </h1>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-6 py-3.5 bg-gradient-to-r from-[#a855f7] to-[#00f3ff] text-black font-black text-xs uppercase tracking-[0.15em] rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shadow-neon-purple shrink-0"
          >
            <PenTool className="w-4 h-4" />
            {showReviewForm ? "Close Review Form" : "Write a Review"}
          </button>
        </div>

        {/* Interactive "Write a Review" Modal Form */}
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 sm:p-8 rounded-3xl bg-[#12121c] border border-[#a855f7]/50 shadow-neon-purple space-y-6"
          >
            <h3 className="text-xl font-display font-black text-white uppercase italic tracking-tight flex items-center gap-2">
              <PenTool className="w-5 h-5 text-[#a855f7]" /> Post an Official Game Review
            </h3>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                    Your Gamer Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. NeonRider"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    required
                    className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00f3ff]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                    Select Indie Title
                  </label>
                  <select
                    value={selectedGameId}
                    onChange={(e) => setSelectedGameId(e.target.value)}
                    className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00f3ff]"
                  >
                    {GAMES_DATA.map((game) => (
                      <option key={game.id} value={game.id}>
                        {game.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                    Star Rating (1 - 5)
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00f3ff]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                    <option value={3}>⭐⭐⭐ (3/5)</option>
                    <option value={2}>⭐⭐ (2/5)</option>
                    <option value={1}>⭐ (1/5)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                  Review Details & Feedback
                </label>
                <textarea
                  placeholder="Share your experience, gameplay thoughts, performance notes..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  required
                  rows={3}
                  className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl p-4 text-xs text-white focus:outline-none focus:border-[#00f3ff]"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 bg-[#00f3ff] text-black font-black text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shadow-neon-cyan"
              >
                <Send className="w-4 h-4" /> Publish Review
              </button>
            </form>
          </motion.div>
        )}

        {/* Community Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#12121c] border border-[#1e1e2e] hover:border-[#a855f7]/40 transition-colors space-y-4"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#a855f7]/50 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{post.author}</span>
                      {post.isDeveloper && (
                        <span className="px-2 py-0.5 bg-[#a855f7]/20 text-[#a855f7] border border-[#a855f7]/40 text-[9px] font-black uppercase rounded-full flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Dev Team
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">{post.date}</span>
                  </div>
                </div>

                {post.gameTitle && (
                  <span className="px-3 py-1 bg-[#1e1e2e] text-[#00f3ff] text-[11px] font-bold uppercase rounded-lg border border-white/5">
                    {post.gameTitle}
                  </span>
                )}
              </div>

              {/* Title & Content */}
              <div>
                <h3 className="text-xl font-display font-black text-white italic uppercase tracking-tight mb-2">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{post.content}</p>
              </div>

              {/* Post Footer Actions */}
              <div className="pt-4 border-t border-[#1e1e2e] flex items-center gap-6 text-xs text-zinc-400">
                <button
                  onClick={() => likePost(post.id)}
                  className="flex items-center gap-2 hover:text-[#00f3ff] transition-colors"
                >
                  <ThumbsUp className="w-4 h-4 text-[#a855f7]" />
                  <span className="font-bold">{post.likes} Upvotes</span>
                </button>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-zinc-500" />
                  <span>{post.comments} Comments</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
