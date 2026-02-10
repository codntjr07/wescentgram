import React, { useState, useEffect, useRef } from 'react';
import { X, Send, User } from 'lucide-react';
import { Character, Message } from '../types';
import { generateCharacterReply } from '../services/geminiService';

interface ChatModalProps {
  character: Character;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ character, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Initial greeting from character
    const initialGreeting: Message = {
      id: 'init-1',
      sender: 'character',
      text: '안녕하세요, 캐스팅 담당자님! 무슨 일이신가요?',
      timestamp: Date.now()
    };
    setMessages([initialGreeting]);
  }, [character.id]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Call Gemini
    const replyText = await generateCharacterReply(character, messages.concat(userMsg), inputValue);

    setIsTyping(false);
    const characterMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'character',
      text: replyText,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, characterMsg]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-3">
             <button onClick={onClose} className="md:hidden mr-2">
                 <X size={20}/>
             </button>
             <div className="relative">
                <img src={character.avatarUrl} className="w-10 h-10 rounded-full object-cover border border-gray-200" alt={character.name}/>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
             </div>
             <div>
               <h3 className="font-semibold text-sm">{character.name}</h3>
               <p className="text-xs text-gray-500">WESCENT Trainee • {character.role}</p>
             </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:bg-gray-100 p-2 rounded-full hidden md:block">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
          <div className="flex justify-center my-4">
            <span className="text-xs text-gray-400 bg-gray-200 px-3 py-1 rounded-full">
              {new Date().toLocaleDateString()}
            </span>
          </div>
          
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm
                ${msg.sender === 'user' 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                }`}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
             <div className="flex justify-start">
               <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-none flex gap-1 shadow-sm">
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                  <User size={14}/>
              </div>
          </button>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="메시지 보내기..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className="p-2 text-blue-500 font-semibold hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;