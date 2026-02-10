import React from 'react';
import { Home, Search, PlusSquare, Heart, User, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-r border-gray-200 bg-white px-6 py-8">
        <h1 className="text-2xl font-bold mb-10 tracking-tighter" style={{ fontFamily: 'Inter' }}>
          WESCENT <span className="text-xs font-normal text-purple-600 block">FLONE PROJECT</span>
        </h1>
        
        <nav className="flex-1 space-y-6">
          <NavItem icon={<Home size={24} />} label="홈" isActive={activeTab === 'home'} onClick={() => onTabChange('home')} />
          <NavItem icon={<Search size={24} />} label="검색" isActive={activeTab === 'search'} onClick={() => onTabChange('search')} />
          <NavItem icon={<PlusSquare size={24} />} label="만들기" isActive={activeTab === 'create'} onClick={() => {}} />
          <NavItem icon={<Heart size={24} />} label="알림" isActive={activeTab === 'notifications'} onClick={() => {}} />
          <NavItem icon={<User size={24} />} label="프로필" isActive={activeTab === 'profile'} onClick={() => onTabChange('profile')} />
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-100">
           <button className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-lg w-full transition-colors text-sm">
             <LogOut size={20} />
             로그아웃
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex justify-center w-full">
        <div className="w-full max-w-[470px] md:max-w-[600px] min-h-screen bg-white md:border-x md:border-gray-200 shadow-sm md:shadow-none pb-16 md:pb-0">
          {children}
        </div>
      </main>

      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center h-12 z-50 px-2">
        <MobileNavItem icon={<Home size={24} />} isActive={activeTab === 'home'} onClick={() => onTabChange('home')} />
        <MobileNavItem icon={<Search size={24} />} isActive={activeTab === 'search'} onClick={() => onTabChange('search')} />
        <MobileNavItem icon={<PlusSquare size={24} />} isActive={false} onClick={() => {}} />
        <MobileNavItem icon={<Heart size={24} />} isActive={false} onClick={() => {}} />
        <MobileNavItem icon={<User size={24} />} isActive={activeTab === 'profile'} onClick={() => onTabChange('profile')} />
      </nav>
    </div>
  );
};

const NavItem = ({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-4 p-3 rounded-lg w-full transition-all duration-200 ${isActive ? 'font-bold bg-gray-50' : 'hover:bg-gray-50'}`}
  >
    {icon}
    <span className={`${isActive ? 'text-black' : 'text-gray-700'}`}>{label}</span>
  </button>
);

const MobileNavItem = ({ icon, isActive, onClick }: { icon: React.ReactNode, isActive: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`p-2 rounded-lg transition-colors ${isActive ? 'text-black' : 'text-gray-500'}`}>
    {icon}
  </button>
);

export default Layout;