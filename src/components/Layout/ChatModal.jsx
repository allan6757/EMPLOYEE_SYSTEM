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
        {chats.map(chat => (
          <div key={chat.id} style={{
            marginBottom: '15px',
            padding: '10px',
            background: chat.fromType === 'employee' ? 'rgba(34, 139, 34, 0.2)' : 'rgba(220, 38, 38, 0.2)',
            borderRadius: '8px'
          }}>
            <div style={{fontSize: '0.8rem', color: '#9ca3af', marginBottom: '4px'}}>
              {chat.from} {chat.boothId && `(Booth: ${chat.boothId})`} - {chat.timestamp}
            </div>
            <div style={{color: '#ffffff', marginBottom: '8px'}}>{chat.message}</div>
            {chat.fromType === 'employee' && replyToMessage && (
              <input
                type="text"
                placeholder="Reply to this message..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    replyToMessage(chat.id, e.target.value);
                    e.target.value = '';
                  }
                }}
                style={{
                  width: '100%',
                  padding: '6px',
                  borderRadius: '6px',
                  border: '1px solid rgba(55, 55, 55, 0.5)',
                  background: 'rgba(31, 31, 31, 0.8)',
                  color: '#ffffff',
                  fontSize: '0.9rem'
                }}
              />
            )}
          </div>
        ))}
      </div>
      
      <div style={{display: 'flex', gap: '10px'}}>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid rgba(55, 55, 55, 0.5)',
            background: 'rgba(31, 31, 31, 0.8)',
            color: '#ffffff'
          }}
        />
        <button onClick={sendMessage} className="action-button" style={{margin: 0}}>Send</button>
        </div>
      </div>
    </SidePanel>
  );
};

export default ChatModal;