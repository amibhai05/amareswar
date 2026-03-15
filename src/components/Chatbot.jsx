import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Ask Ami's Bot. How can I help you today?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const result = await model.generateContent(inputMessage);
      const response = await result.response;
      const botMessage = { text: response.text(), sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      let errorMessage = 'Sorry, I encountered an error. Please try again.';

      if (error.message) {
        console.error('Error message:', error.message);
        if (error.message.includes('API_KEY')) {
          errorMessage = 'API key issue. Please check your configuration.';
        } else if (error.message.includes('model')) {
          errorMessage = 'Model not available. Using fallback model.';
          // Try fallback model
          try {
            const fallbackModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            const fallbackResult = await fallbackModel.generateContent(inputMessage);
            const fallbackResponse = await fallbackResult.response;
            const fallbackBotMessage = { text: fallbackResponse.text(), sender: 'bot' };
            setMessages(prev => [...prev, fallbackBotMessage]);
            return;
          } catch (fallbackError) {
            console.error('Fallback model also failed:', fallbackError);
          }
        }
      }

      setMessages(prev => [...prev, { text: errorMessage, sender: 'bot' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <div className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <div className="robot-icon">
            🤖
          </div>
          <div className="chatbot-label">Ask Ami's Bot</div>
        </div>
      )}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="robot-header-icon">🤖</div>
            <h3>Ask Ami's Bot</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <div className="message-content">
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message bot typing">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={isTyping || !inputMessage.trim()}
              className="send-btn"
            >
              {isTyping ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;