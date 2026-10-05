import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// Custom scrollbar styles
const scrollbarStyles = `
  /* Custom Scrollbar Styles */
  .scrollbar-light::-webkit-scrollbar {
    width: 6px;
  }
  
  .scrollbar-light::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 8px;
  }
  
  .scrollbar-light::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 8px;
  }
  
  .scrollbar-light::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
  }
  
  .scrollbar-dark::-webkit-scrollbar {
    width: 6px;
  }
  
  .scrollbar-dark::-webkit-scrollbar-track {
    background: #2d3748;
    border-radius: 8px;
  }
  
  .scrollbar-dark::-webkit-scrollbar-thumb {
    background: #4a5568;
    border-radius: 8px;
  }
  
  .scrollbar-dark::-webkit-scrollbar-thumb:hover {
    background: #718096;
  }
`;

// Sample chat data
const generateSampleChats = () => {
  return [
    {
      id: 1,
      avatar: null,
      name: 'Sarah Johnson',
      lastMessage: 'We need more LED light bulbs for the next shipment',
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      unread: 2,
      messages: [
        {
          id: 1,
          sender: 'Sarah Johnson',
          content: 'Hello, we are running low on LED light bulbs',
          timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
          isMe: false
        },
        {
          id: 2,
          sender: 'Me',
          content: 'Thanks for letting me know. How many do we need?',
          timestamp: new Date(Date.now() - 5400000).toISOString(), // 1.5 hours ago
          isMe: true
        },
        {
          id: 3,
          sender: 'Sarah Johnson',
          content: 'We need at least 20 packs',
          timestamp: new Date(Date.now() - 3900000).toISOString(), // 65 mins ago
          isMe: false
        },
        {
          id: 4,
          sender: 'Sarah Johnson',
          content: 'We need more LED light bulbs for the next shipment',
          timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          isMe: false
        }
      ]
    },
    {
      id: 2,
      avatar: null,
      name: 'Michael Brown',
      lastMessage: 'I just updated the inventory count for plumbing supplies',
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      unread: 0,
      messages: [
        {
          id: 1,
          sender: 'Michael Brown',
          content: 'Hello, I\'m doing inventory today',
          timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          isMe: false
        },
        {
          id: 2,
          sender: 'Me',
          content: 'Great, please update me when you\'re done',
          timestamp: new Date(Date.now() - 95400000).toISOString(), // ~26.5 hours ago
          isMe: true
        },
        {
          id: 3,
          sender: 'Michael Brown',
          content: 'I just updated the inventory count for plumbing supplies',
          timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          isMe: false
        }
      ]
    }
  ];
};

const MessagePanel = ({ darkMode, onClose }) => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showChats, setShowChats] = useState(true);
  const [justSentMessage, setJustSentMessage] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    // In a real app, you'd fetch chats from an API or state management
    const storedChats = localStorage.getItem('chats');
    if (storedChats) {
      setChats(JSON.parse(storedChats));
    } else {
      const sampleChats = generateSampleChats();
      setChats(sampleChats);
      localStorage.setItem('chats', JSON.stringify(sampleChats));
    }
  }, []);

  useEffect(() => {
    // Only scroll to bottom when:
    // 1. User just sent a new message
    // 2. Not when first opening a conversation
    if (messagesEndRef.current && justSentMessage) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      setJustSentMessage(false);
    }
  }, [justSentMessage, chats]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    const updatedChats = chats.map(chat => {
      if (chat.id === activeChat.id) {
        const newMsg = {
          id: chat.messages.length + 1,
          sender: 'Me',
          content: newMessage.trim(),
          timestamp: new Date().toISOString(),
          isMe: true
        };
        
        return {
          ...chat,
          lastMessage: newMessage.trim(),
          timestamp: new Date().toISOString(),
          messages: [...chat.messages, newMsg]
        };
      }
      return chat;
    });

    setChats(updatedChats);
    localStorage.setItem('chats', JSON.stringify(updatedChats));
    setNewMessage('');
    setJustSentMessage(true);
  };

  const handleChatSelect = (chat) => {
    // Mark messages as read when opening chat
    const updatedChats = chats.map(c => {
      if (c.id === chat.id) {
        return {
          ...c,
          unread: 0
        };
      }
      return c;
    });

    setChats(updatedChats);
    localStorage.setItem('chats', JSON.stringify(updatedChats));
    setActiveChat(chat);
    setShowChats(false);
  };

  const handleBackToChats = () => {
    setShowChats(true);
    setActiveChat(null);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getInitials = (name) => {
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className={`flex flex-col h-full rounded-lg overflow-hidden shadow-xl transition-all duration-300 ${
      darkMode ? 'bg-dark-card text-gray-200' : 'bg-white text-gray-800'
    }`}>
      {/* Inject custom scrollbar styles */}
      <style>{scrollbarStyles}</style>
      
      {!activeChat ? (
        // Chats List View
        <>
          <div className={`flex items-center justify-between px-4 py-3 border-b ${darkMode ? 'border-dark-border' : 'border-gray-200'}`}>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Messages</h3>
            <button
              onClick={onClose}
              className={`p-1.5 rounded-full transition-colors duration-200 ${
                darkMode 
                  ? 'hover:bg-dark-hover text-gray-400 hover:text-gray-200' 
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className={`flex-1 overflow-y-auto ${darkMode ? 'scrollbar-dark' : 'scrollbar-light'}`}>
            {chats.length === 0 ? (
              <div className={`flex flex-col items-center justify-center p-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <svg className="w-12 h-12 mb-3 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p className="text-sm">No conversations yet</p>
              </div>
            ) : (
              chats.map((chat) => (
                <div 
                  key={chat.id} 
                  className={`p-3.5 border-b transition-colors duration-200 ${darkMode 
                    ? 'border-dark-border hover:bg-dark-hover' 
                    : 'border-gray-100 hover:bg-gray-50'
                  } cursor-pointer`}
                  onClick={() => handleChatSelect(chat)}
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      darkMode ? 'bg-primary-700/20 text-primary-400' : 'bg-primary-100 text-primary-700'
                    }`}>
                      {chat.avatar ? (
                        <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full" />
                      ) : (
                        <span className="font-medium">{getInitials(chat.name)}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <h4 className={`font-medium truncate ${darkMode ? 'text-white' : 'text-gray-800'}`}>{chat.name}</h4>
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {formatTime(chat.timestamp)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className={`text-sm truncate ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {chat.lastMessage}
                        </p>
                        {chat.unread > 0 && (
                          <span className="ml-2 bg-primary-600 text-white text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1.5 transform transition-transform hover:scale-105">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className={`p-3 border-t ${darkMode ? 'border-dark-border' : 'border-gray-200'}`}>
            <button
              className={`w-full py-2 text-xs font-medium rounded-lg transition-colors duration-200 ${
                darkMode 
                  ? 'bg-primary-600 text-white hover:bg-primary-700' 
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              Start New Conversation
            </button>
          </div>
        </>
      ) : (
        // Individual Chat View
        <>
          <div className={`flex items-center px-4 py-3 border-b ${darkMode ? 'border-dark-border' : 'border-gray-200'}`}>
            <button
              onClick={handleBackToChats}
              className={`p-1.5 mr-2 rounded-full transition-colors duration-200 ${
                darkMode 
                  ? 'hover:bg-dark-hover text-gray-400 hover:text-gray-200' 
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                darkMode ? 'bg-primary-700/20 text-primary-400' : 'bg-primary-100 text-primary-700'
              }`}>
                {activeChat?.avatar ? (
                  <img src={activeChat.avatar} alt={activeChat.name} className="w-8 h-8 rounded-full" />
                ) : (
                  <span className="text-sm font-medium">{getInitials(activeChat?.name || '')}</span>
                )}
              </div>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{activeChat?.name}</h3>
            </div>
            
            <button
              onClick={onClose}
              className={`p-1.5 rounded-full transition-colors duration-200 ${
                darkMode 
                  ? 'hover:bg-dark-hover text-gray-400 hover:text-gray-200' 
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={messagesContainerRef}
            className={`flex-1 p-4 overflow-y-auto ${darkMode ? 'scrollbar-dark' : 'scrollbar-light'}`}
          >
            <div className="space-y-3">
              <div className="text-center mb-6">
                <span className={`inline-block px-3 py-1 text-xs rounded-full ${
                  darkMode ? 'bg-dark-hover text-gray-400' : 'bg-gray-100 text-gray-500'
                }`}>
                  {new Date(activeChat?.messages[0]?.timestamp || Date.now()).toLocaleDateString()}
                </span>
              </div>
              
              {activeChat?.messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.isMe ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  {!message.isMe && (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 mt-1 ${
                      darkMode ? 'bg-primary-700/20 text-primary-400' : 'bg-primary-100 text-primary-700'
                    }`}>
                      <span className="text-sm font-medium">{getInitials(message.sender)}</span>
                    </div>
                  )}
                  <div className={`max-w-[75%] ${message.isMe ? 'order-1' : 'order-2'}`}>
                    <div className={`rounded-lg py-2.5 px-3.5 inline-block shadow-sm transition-all duration-200 ${
                      message.isMe
                        ? darkMode 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-primary-600 text-white'
                        : darkMode 
                          ? 'bg-dark-hover text-gray-200' 
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'} ${message.isMe ? 'text-right' : 'text-left'}`}>
                      {formatMessageTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className={`border-t ${darkMode ? 'border-dark-border' : 'border-gray-200'} p-3`}>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm transition-colors duration-200 ${
                  darkMode 
                    ? 'bg-dark-hover border-dark-border text-white placeholder-gray-400' 
                    : 'bg-gray-100 border-gray-200 text-gray-800'
                } border focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className={`p-2.5 rounded-lg transition-all duration-200 ${
                  !newMessage.trim()
                    ? darkMode 
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-70' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-70'
                    : darkMode 
                      ? 'bg-primary-600 text-white hover:bg-primary-700 transform hover:scale-105' 
                      : 'bg-primary-600 text-white hover:bg-primary-700 transform hover:scale-105'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

MessagePanel.propTypes = {
  darkMode: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

export default MessagePanel; 