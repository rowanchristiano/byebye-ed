import React, { useState } from 'react';
import { ShieldCheck, Heart, Sparkles, MessageCircle, Share2, Users, PlusCircle, AlertCircle, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';

const ENCOURAGEMENT_BADGES = [
  { id: 'hug', label: 'Warm Hug', icon: '🫂' },
  { id: 'proud', label: 'Proud of You', icon: '✨' },
  { id: 'strength', label: 'Gentle Strength', icon: '🌱' },
  { id: 'peace', label: 'Holding Space', icon: '🍵' },
];

const INITIAL_POSTS = [
  {
    id: 'post_1',
    author: 'QuietRiver',
    avatarBg: 'bg-purple-100 text-purple-700',
    avatarInitials: 'QR',
    timeAgo: '2h ago',
    tag: 'Meal Win 🍲',
    text: 'Today I tried a new pasta recipe with warm olive oil and garlic. For the first time in months, I stayed present and didn’t calculate anything. It actually made me feel so grounded.',
    emojiFood: '🍲',
    likesCount: 231,
    isLiked: false,
    badgeCounts: { hug: 42, proud: 88, strength: 19 },
    userReactions: {},
    commentsCount: 14,
  },
  {
    id: 'post_2',
    author: 'SunlightMeadow',
    avatarBg: 'bg-emerald-100 text-emerald-800',
    avatarInitials: 'SM',
    timeAgo: '4h ago',
    tag: 'Urge Surfing 🌊',
    text: 'Felt a sudden panic after breakfast today. Instead of spiraling, I sat with Mimi for 5 minutes and did box breathing. The wave passed. If you are struggling today, remember: urges always crest and fade.',
    emojiFood: '🥞',
    likesCount: 174,
    isLiked: true,
    badgeCounts: { hug: 65, proud: 52, peace: 31 },
    userReactions: { hug: true },
    commentsCount: 9,
  },
  {
    id: 'post_3',
    author: 'GentleFern',
    avatarBg: 'bg-amber-100 text-amber-800',
    avatarInitials: 'GF',
    timeAgo: '6h ago',
    tag: 'Self-Compassion 🌿',
    text: 'Reminder to anyone who needs it today: Your worth as a human is not tied to food or your reflection in a mirror. You deserve nourishment without punishment.',
    emojiFood: '🍎',
    likesCount: 312,
    isLiked: false,
    badgeCounts: { hug: 92, proud: 110, strength: 48 },
    userReactions: {},
    commentsCount: 23,
  },
];

/**
 * CommunityScreen: Safe Circle Peer Support
 * Features:
 * 1. Prominent safety guidelines strictly prohibiting weight loss, calorie numbers, and diet advice.
 * 2. Support groups with member counts ("Anonymous support group: 1.2k members").
 * 3. Anonymous peer posts with interactive encouragement badges and comment counts.
 * 4. Anonymous reflection composer with gentle trigger filtering.
 */
export function CommunityScreen({ onNavigate }) {
  const { userProfile, recordViewedCommunityPosts } = useApp();
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'groups'
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newPostText, setNewPostText] = useState('');
  const [newPostTag, setNewPostTag] = useState('Gentle Win 🌸');
  const [showComposer, setShowComposer] = useState(false);
  const [warningNotice, setWarningNotice] = useState('');
  const [joinedGroups, setJoinedGroups] = useState({
    grp_1: true,
    grp_2: true,
    grp_3: false,
  });

  // Automatically record community posts viewed for progressive accessory unlock
  React.useEffect(() => {
    if (recordViewedCommunityPosts && posts?.length) {
      recordViewedCommunityPosts(posts.map((p) => p.id));
    }
  }, [posts, recordViewedCommunityPosts]);

  const handleToggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const nextLiked = !p.isLiked;
          return {
            ...p,
            isLiked: nextLiked,
            likesCount: nextLiked ? p.likesCount + 1 : p.likesCount - 1,
          };
        }
        return p;
      })
    );
  };

  const handleToggleBadge = (postId, badgeId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const currentlyReacted = Boolean(p.userReactions?.[badgeId]);
          const currentCount = p.badgeCounts?.[badgeId] || 0;
          return {
            ...p,
            userReactions: {
              ...p.userReactions,
              [badgeId]: !currentlyReacted,
            },
            badgeCounts: {
              ...p.badgeCounts,
              [badgeId]: currentlyReacted ? Math.max(0, currentCount - 1) : currentCount + 1,
            },
          };
        }
        return p;
      })
    );
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    const text = newPostText.trim();
    if (!text) return;

    // Safety filter: check for numbers or diet trigger keywords
    const lower = text.toLowerCase();
    if (
      lower.includes('calorie') ||
      lower.includes('calories') ||
      lower.includes('kcal') ||
      lower.includes('weight') ||
      lower.includes('diet') ||
      lower.includes('lbs') ||
      lower.includes('kg') ||
      /\d+\s*(cal|calorie|kcal|lb|kg)/i.test(text)
    ) {
      setWarningNotice(
        'For community safety, posts mentioning calories, weights, or diet specifics cannot be shared. Thank you for protecting our safe circle! 🌿'
      );
      return;
    }

    setWarningNotice('');
    const newPost = {
      id: `post_${Date.now()}`,
      author: 'KindNeighbor',
      avatarBg: 'bg-rose-100 text-rose-700',
      avatarInitials: 'KN',
      timeAgo: 'Just now',
      tag: newPostTag,
      text,
      likesCount: 1,
      isLiked: true,
      badgeCounts: { hug: 1, proud: 1 },
      userReactions: { hug: true },
      commentsCount: 0,
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
    setShowComposer(false);
  };

  const toggleGroupJoin = (grpId) => {
    setJoinedGroups((prev) => ({
      ...prev,
      [grpId]: !prev[grpId],
    }));
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-[#FDFBF7] animate-in fade-in duration-200 select-none overflow-hidden">
      {/* HEADER */}
      <div className="px-5 pt-7 pb-2.5 border-b border-[#F2ECE0] flex items-center justify-between shrink-0 bg-[#FAF4EA]/80 backdrop-blur-xs">
        <div>
          <h2 className="text-base font-bold text-[#3B3029]">Safe Circle Community</h2>
          <p className="text-xs text-[#8C7A70]">Safe, moderated peer support</p>
        </div>
        <button
          type="button"
          onClick={() => setShowComposer(!showComposer)}
          className="px-3 py-1 rounded-full bg-[#7DAE8B] hover:bg-[#6CA07B] text-white text-xs font-bold shadow-xs cursor-pointer transition-all active:scale-95 flex items-center gap-1"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>

      {/* CONTENT SCROLL */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5">
        {/* PROMINENT COMMUNITY SAFETY GUIDELINES */}
        <div className="p-3 rounded-2xl bg-[#EBF4EE] border border-[#CFE4D6] text-xs text-[#2A5C3D] shadow-2xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wider text-[#1F5332]">
            <ShieldCheck className="w-4 h-4 text-[#7DAE8B]" />
            <span>Community Safety Guidelines</span>
          </div>
          <p className="text-[11px] text-[#336345] leading-relaxed">
            Strictly <strong>NO mentions of calorie numbers, weight, fasting, or diet advice</strong>. This circle is protected for body neutrality, mutual validation, and guilt-free healing.
          </p>
        </div>

        {/* COMPOSER (COLLAPSIBLE) */}
        {showComposer && (
          <form
            onSubmit={handleCreatePost}
            className="p-3.5 rounded-3xl bg-white border border-[#EAE1D2] shadow-xs space-y-2.5 animate-in slide-in-from-top-2 duration-150"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#3B3029]">
                Share an Anonymous Reflection 🌿
              </span>
              <button
                type="button"
                onClick={() => setShowComposer(false)}
                className="text-stone-400 hover:text-stone-700 text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <textarea
              rows={3}
              value={newPostText}
              onChange={(e) => {
                setNewPostText(e.target.value);
                setWarningNotice('');
              }}
              placeholder="Write an encouraging reflection or milestone (never numbers)..."
              className="w-full p-2.5 bg-[#FAF6F0] rounded-2xl border border-[#EAE0D0] text-xs text-[#382E26] focus:outline-none focus:border-[#7DAE8B] resize-none"
            />

            {warningNotice && (
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-[10px] text-amber-800 flex items-start gap-1">
                <AlertCircle className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                <span>{warningNotice}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <div className="flex gap-1">
                {['Gentle Win 🌸', 'Breathing 🌿', 'Food Peace 🍵'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setNewPostTag(tag)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold cursor-pointer ${
                      newPostTag === tag
                        ? 'bg-[#3D2D3E] text-white'
                        : 'bg-[#FAF6F0] text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={!newPostText.trim()}
                className="px-3.5 py-1 bg-[#7DAE8B] hover:bg-[#6CA07B] disabled:opacity-40 text-white text-xs font-bold rounded-full cursor-pointer transition-all"
              >
                Post
              </button>
            </div>
          </form>
        )}

        {/* SUB-TABS: FEED vs SUPPORT GROUPS */}
        <div className="p-1 rounded-full bg-[#EAE3D5] flex items-center">
          <button
            type="button"
            onClick={() => setActiveTab('feed')}
            className={`flex-1 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
              activeTab === 'feed'
                ? 'bg-white text-[#2F2925] shadow-xs'
                : 'text-[#7D6F65] hover:text-[#4F4138]'
            }`}
          >
            Safe Circle Feed
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('groups')}
            className={`flex-1 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
              activeTab === 'groups'
                ? 'bg-white text-[#2F2925] shadow-xs'
                : 'text-[#7D6F65] hover:text-[#4F4138]'
            }`}
          >
            Support Groups
          </button>
        </div>

        {/* ================= SECTION 1: SUPPORT GROUPS ================= */}
        {activeTab === 'groups' && (
          <div className="space-y-2.5 animate-in fade-in duration-150">
            {/* Group 1 */}
            <div className="p-3.5 rounded-3xl bg-white border border-[#EAE1D2] flex items-center justify-between shadow-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-[#3B3029]">Anonymous support group</h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-[10px] text-[#8C7A70]">1.2k members • Motivate each other</p>
                <p className="text-[10px] text-[#2A5C3D] font-medium">Daily gentle check-ins</p>
              </div>
              <button
                type="button"
                onClick={() => toggleGroupJoin('grp_1')}
                className={`px-3.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
                  joinedGroups.grp_1
                    ? 'bg-[#7DAE8B] text-white shadow-xs'
                    : 'bg-[#FAF6F0] text-[#553E31] border border-[#EAE0D0]'
                }`}
              >
                {joinedGroups.grp_1 ? 'Joined ✓' : 'Join'}
              </button>
            </div>

            {/* Group 2 */}
            <div className="p-3.5 rounded-3xl bg-white border border-[#EAE1D2] flex items-center justify-between shadow-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-[#3B3029]">Progress buddies</h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-[10px] text-[#8C7A70]">125 members • Share meals & recipes</p>
                <p className="text-[10px] text-[#A66C1A] font-medium">Focus on nourishing joy</p>
              </div>
              <button
                type="button"
                onClick={() => toggleGroupJoin('grp_2')}
                className={`px-3.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
                  joinedGroups.grp_2
                    ? 'bg-[#7DAE8B] text-white shadow-xs'
                    : 'bg-[#FAF6F0] text-[#553E31] border border-[#EAE0D0]'
                }`}
              >
                {joinedGroups.grp_2 ? 'Joined ✓' : 'Join'}
              </button>
            </div>

            {/* Group 3 */}
            <div className="p-3.5 rounded-3xl bg-white border border-[#EAE1D2] flex items-center justify-between shadow-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-[#3B3029]">Mindful Breathers</h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-[10px] text-[#8C7A70]">840 members • Grounding together</p>
                <p className="text-[10px] text-[#3D2D3E] font-medium">Urge surfing & 5-4-3-2-1</p>
              </div>
              <button
                type="button"
                onClick={() => toggleGroupJoin('grp_3')}
                className={`px-3.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
                  joinedGroups.grp_3
                    ? 'bg-[#7DAE8B] text-white shadow-xs'
                    : 'bg-[#FAF6F0] text-[#553E31] border border-[#EAE0D0]'
                }`}
              >
                {joinedGroups.grp_3 ? 'Joined ✓' : 'Join'}
              </button>
            </div>
          </div>
        )}

        {/* ================= SECTION 2: FORUM POSTS ================= */}
        {activeTab === 'feed' && (
          <div className="space-y-3.5 animate-in fade-in duration-150">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-3xl bg-white border border-[#EAE1D2] shadow-xs space-y-2.5"
              >
                {/* Author row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${post.avatarBg}`}
                    >
                      {post.avatarInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#3B3029]">{post.author}</span>
                        <span className="text-[9px] text-[#8C7A70]">{post.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#FAF6F0] border border-[#EFE5D5] text-[#7A6455]">
                    {post.tag}
                  </span>
                </div>

                {/* Post body */}
                <p className="text-xs text-[#4F4138] leading-relaxed">
                  “{post.text}”
                </p>

                {/* Optional visual meal preview if present */}
                {post.emojiFood && (
                  <div className="w-full h-24 rounded-2xl bg-[#FFF6EE] border border-[#F6E1D2] flex items-center justify-center text-3xl shadow-inner select-none">
                    {post.emojiFood}
                  </div>
                )}

                {/* Interactive Encouragement Badges */}
                <div className="pt-1 border-t border-[#F4EFE6] flex flex-wrap gap-1.5 items-center">
                  {ENCOURAGEMENT_BADGES.map((b) => {
                    const count = post.badgeCounts?.[b.id] || 0;
                    const hasReacted = Boolean(post.userReactions?.[b.id]);
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => handleToggleBadge(post.id, b.id)}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1 transition-all cursor-pointer ${
                          hasReacted
                            ? 'bg-[#EBF4EE] border border-[#B9DAC4] text-[#1F5332] font-bold'
                            : 'bg-[#FAF6F0] border border-[#EFE5D5] text-[#6F5E52] hover:bg-stone-100'
                        }`}
                      >
                        <span>{b.icon}</span>
                        <span>{b.label}</span>
                        {count > 0 && <span className="opacity-80">({count})</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Interaction footer */}
                <div className="flex items-center justify-between pt-1 text-xs text-[#806E63]">
                  <button
                    type="button"
                    onClick={() => handleToggleLike(post.id)}
                    className={`flex items-center gap-1 cursor-pointer transition-colors ${
                      post.isLiked ? 'text-[#DE6852] font-bold' : 'hover:text-[#DE6852]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-[#DE6852]' : ''}`} />
                    <span>{post.likesCount}</span>
                  </button>

                  <div className="flex items-center gap-1 text-[11px] text-[#8C7A70]">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{post.commentsCount} comments</span>
                  </div>

                  <Share2 className="w-3.5 h-3.5 text-[#8C7A70] hover:text-[#3B3029] cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div className="bg-[#CBD7E2] rounded-t-[28px] pt-2 pb-1 px-4 shrink-0">
        <BottomNav activeTab="community" onTabChange={onNavigate} isHomeOverlay={true} />
      </div>
    </div>
  );
}

export default CommunityScreen;
