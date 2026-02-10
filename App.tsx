import React, { useState } from 'react';
import Layout from './components/Layout';
import Post from './components/Post';
import Profile from './components/Profile';
import ChatModal from './components/ChatModal';
import { CHARACTERS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);

  // Helper to parse relative time string to minutes for sorting
  const parseTime = (timeStr: string): number => {
    const num = parseInt(timeStr.replace(/[^0-9]/g, ''), 10);
    if (isNaN(num)) return 999999;
    
    if (timeStr.includes('minute')) return num;
    if (timeStr.includes('hour')) return num * 60;
    if (timeStr.includes('day')) return num * 60 * 24;
    if (timeStr.includes('week')) return num * 60 * 24 * 7;
    if (timeStr.includes('month')) return num * 60 * 24 * 30;
    
    return 0; // "Just now" or similar
  };

  // Collect all posts and sort by timestamp (newest first / smallest relative time first)
  const allPosts = CHARACTERS.flatMap(char => 
    char.posts.map(post => ({ ...post, author: char }))
  ).sort((a, b) => parseTime(a.timestamp) - parseTime(b.timestamp));

  const handleAuthorClick = (id: string) => {
    setSelectedCharacterId(id);
    setActiveTab('profile');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setSelectedCharacterId(null);
    setActiveTab('home');
  };

  const selectedCharacter = CHARACTERS.find(c => c.id === selectedCharacterId);

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      
      {/* HOME FEED VIEW */}
      {activeTab === 'home' && (
        <div className="flex flex-col">
          {/* Posts Feed */}
          <div className="flex flex-col">
            {allPosts.map((item) => (
              <Post 
                key={`${item.author.id}-${item.id}`} 
                post={item} 
                author={item.author} 
                onAuthorClick={handleAuthorClick}
              />
            ))}
          </div>
          
          <div className="p-8 text-center text-gray-400 text-sm">
             <div className="w-12 h-12 border-2 border-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">✓</div>
             <p>모든 게시물을 확인했습니다.</p>
          </div>
        </div>
      )}

      {/* SEARCH VIEW (Placeholder) */}
      {activeTab === 'search' && (
        <div className="grid grid-cols-3 gap-1">
           {Array.from({length: 12}).map((_, i) => (
             <div key={i} className="aspect-[3/4] bg-gray-200 relative overflow-hidden">
                <img 
                    src={`https://picsum.photos/id/${10 + i * 10}/300/400`} 
                    alt="explore" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
             </div>
           ))}
        </div>
      )}

      {/* PROFILE VIEW */}
      {activeTab === 'profile' && selectedCharacter && (
        <Profile 
          character={selectedCharacter} 
          onBack={handleBackToHome} 
          onOpenChat={() => setShowChat(true)}
        />
      )}
      
      {/* Profile for Current User (Fallback) */}
      {activeTab === 'profile' && !selectedCharacter && (
          <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
             <p className="mb-4">WESCENT Casting Official Account</p>
             <button onClick={() => setActiveTab('home')} className="text-blue-500">홈으로 돌아가기</button>
          </div>
      )}

      {/* CHAT MODAL */}
      {showChat && selectedCharacter && (
        <ChatModal 
          character={selectedCharacter} 
          onClose={() => setShowChat(false)} 
        />
      )}

    </Layout>
  );
};

export default App;