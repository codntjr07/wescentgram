import React from 'react';
import { Character } from '../types';
import { Grid, Bookmark, UserCheck, MessageCircle } from 'lucide-react';

interface ProfileProps {
  character: Character;
  onBack: () => void;
  onOpenChat: () => void;
}

const Profile: React.FC<ProfileProps> = ({ character, onBack, onOpenChat }) => {
  
  const formatCount = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <div className="flex items-center px-4 py-3 border-b border-gray-100 md:hidden sticky top-0 bg-white z-10">
        <button onClick={onBack} className="mr-4 text-2xl font-light">←</button>
        <span className="font-bold text-lg">{character.handle}</span>
      </div>

      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        {/* Profile Header Info */}
        <div className="flex gap-6 md:gap-10 items-center mb-8">
          <div className="w-20 h-20 md:w-36 md:h-36 flex-shrink-0">
             <div className={`w-full h-full rounded-full p-[2px] ${character.story ? 'bg-gradient-to-tr from-yellow-400 to-purple-600' : 'bg-gray-200'}`}>
                <img 
                  src={character.avatarUrl} 
                  alt={character.name} 
                  className="w-full h-full rounded-full object-cover border-4 border-white"
                />
             </div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <h2 className="text-xl font-light truncate">{character.handle}</h2>
              <div className="flex gap-2">
                <button className="bg-gray-100 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
                  팔로잉
                </button>
                <button 
                    onClick={onOpenChat}
                    className="bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors flex items-center gap-1"
                >
                    메시지
                </button>
              </div>
            </div>

            <div className="hidden md:flex gap-8 mb-4 text-base">
              <span><strong>{character.posts.length}</strong> 게시물</span>
              <span><strong>{formatCount(character.followerCount)}</strong> 팔로워</span>
              <span><strong>{character.followingCount}</strong> 팔로우</span>
            </div>

            <div className="text-sm">
              <p className="font-bold mb-0.5">{character.name}</p>
              <p className="text-gray-500 mb-1">{character.role}</p>
              <p className="whitespace-pre-line leading-normal">{character.bio}</p>
            </div>
          </div>
        </div>

        {/* Mobile Stats */}
        <div className="flex md:hidden border-t border-b border-gray-100 py-3 justify-around text-sm mb-4">
          <div className="text-center">
            <div className="font-bold">{character.posts.length}</div>
            <div className="text-gray-500">게시물</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{formatCount(character.followerCount)}</div>
            <div className="text-gray-500">팔로워</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{character.followingCount}</div>
            <div className="text-gray-500">팔로우</div>
          </div>
        </div>

        {/* Traits Pills */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 px-1 scrollbar-hide">
            {character.traits.map(trait => (
                <span key={trait} className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600 whitespace-nowrap">
                    #{trait}
                </span>
            ))}
        </div>

        {/* Tabs */}
        <div className="flex border-t border-gray-200">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 border-t border-black -mt-px">
            <Grid size={16} />
            <span className="text-xs font-semibold tracking-widest uppercase">Posts</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 text-gray-400">
            <UserCheck size={16} />
            <span className="text-xs font-semibold tracking-widest uppercase">Tagged</span>
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-1 md:gap-6">
          {character.posts.map(post => (
            <div key={post.id} className="aspect-square bg-gray-100 relative group cursor-pointer overflow-hidden">
              <img src={post.imageUrl} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-4 font-bold">
                 <div className="flex items-center gap-1"><span className="text-lg">❤️</span> {post.likes}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;