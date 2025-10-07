import React from 'react';
import SidePanel from './SidePanel';

const ChatModal = ({ 
  showChat, 
  setShowChat, 
  chats, 
  newMessage, 
  setNewMessage, 
  sendMessage, 
  title,
  replyToMessage = null 
}) => {
  return (
    <SidePanel isOpen={showChat} onClose={() => setShowChat(false)} title={title}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
        <div style={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: '15px',
          padding: '10px',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '8px'
        }}>
        {chats.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: '#9ca3af',
            padding: '20px',
            fontStyle: 'italic'
          }}>
            No messages yet. Start a conversation!
          </div>
        )}
        {chats.map(chat => (
          <div key={chat.id} style={{
            marginBottom: '15px',
            padding: '12px',
            background: chat.fromType === 'employee' 
              ? 'rgba(34, 139, 34, 0.2)' 
              : 'rgba(59, 130, 246, 0.2)',
            borderRadius: '8px',
            borderLeft: `4px solid ${chat.fromType === 'employee' ? '#22c55e' : '#3b82f6'}`
          }}>
            <div style={{
              fontSize: '0.85rem', 
              color: chat.fromType === 'employee' ? '#22c55e' : '#3b82f6',
              marginBottom: '6px',
              fontWeight: '600'
            }}>
              {chat.fromType === 'employee' ? '👤' : '👨‍💼'} {chat.from} 
              {chat.boothId && `(${chat.boothId})`}
              <span style={{color: '#9ca3af', fontWeight: 'normal', marginLeft: '8px'}}>
                {chat.timestamp}
              </span>
            </div>
            <div style={{color: '#ffffff', lineHeight: '1.4'}}>{chat.message}</div>
            {chat.fromType === 'employee' && replyToMessage && (
              <input
                type="text"
                placeholder="💬 Quick reply..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    replyToMessage(chat.id, e.target.value);
                    e.target.value = '';
                  }
                }}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  background: 'rgba(31, 31, 31, 0.8)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  marginTop: '8px'
                }}
              />
            )}
          </div>
        ))}
      </div>
      
      <div style={{display: 'flex', gap: '10px'}}>
        <input
          type="text"
          placeholder="💬 Type your message..."
          value={newMessage || ''}
          onChange={(e) => setNewMessage && setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage && sendMessage()}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid rgba(55, 55, 55, 0.5)',
            background: 'rgba(31, 31, 31, 0.8)',
            color: '#ffffff',
            fontSize: '0.95rem'
          }}
        />
        <button onClick={sendMessage} className="action-button" style={{margin: 0}}>Send</button>
        </div>
      </div>
    </SidePanel>
  );
};

export default ChatModal;