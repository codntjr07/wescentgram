import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { Post as PostType, Character } from '../types';

interface PostProps {
  post: PostType;
  author: Character;
  onAuthorClick: (id: string) => void;
}

const Post: React.FC<PostProps> = ({ post, author, onAuthorClick }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <article className="border-b border-gray-100 pb-4 mb-4">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onAuthorClick(author.id)}>
          <div className={`w-8 h-8 rounded-full p-[2px] ${author.story ? 'bg-gradient-to-tr from-yellow-400 to-purple-600' : 'bg-transparent'}`}>
            <img 
              src={author.avatarUrl} 
              alt={author.name} 
              className="w-full h-full rounded-full object-cover border-2 border-white"
            />
          </div>
          <span className="font-semibold text-sm">{author.handle}</span>
        </div>
        <MoreHorizontal size={20} className="text-gray-500 cursor-pointer" />
      </div>

      {/* Image */}
      <div className="w-full aspect-square bg-gray-100 overflow-hidden">
        <img src={post.imageUrl} alt="Post content" className="w-full h-full object-cover" loading="lazy" />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2">
        <div className="flex items-center gap-4">
          <button onClick={handleLike} className={`transition-transform active:scale-90 ${liked ? 'text-red-500' : 'text-black'}`}>
            <Heart size={24} fill={liked ? "currentColor" : "none"} />
          </button>
          <button className="hover:text-gray-600">
            <MessageCircle size={24} />
          </button>
          <button className="hover:text-gray-600">
            <Send size={24} />
          </button>
        </div>
        <button className="hover:text-gray-600">
          <Bookmark size={24} />
        </button>
      </div>

      {/* Likes */}
      <div className="px-3 font-semibold text-sm mb-1">
        좋아요 {likeCount.toLocaleString()}개
      </div>

      {/* Caption */}
      <div className="px-3 text-sm mb-1">
        <span className="font-semibold mr-2 cursor-pointer" onClick={() => onAuthorClick(author.id)}>{author.handle}</span>
        <span className="text-gray-800 whitespace-pre-wrap">{post.caption}</span>
      </div>

      {/* Timestamp */}
      <div className="px-3 text-[10px] text-gray-400 uppercase tracking-wide">
        {post.timestamp}
      </div>
    </article>
  );
};

export default Post;