import React, { useState, useEffect, useRef } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [currentStep, setCurrentStep] = useState('start'); // Track the current step in the conversation
  const chatBoxRef = useRef(null);

  // Define the conversation flow
  const conversationFlow = {
    start: {
      message: "Welcome! Please select an option:\n1. Account Issues\n2. Technical Support\n3. Pricing Details\n4. Exit",
      options: {
        1: 'accountIssues',
        2: 'technicalSupport',
        3: 'pricingDetails',
        4: 'helpAndSupport',
      },
    },
    accountIssues: {
      message: "You selected Account Issues. What do you need help with?\n1. Reset Password\n2. Update Profile\n3. Back to Main Menu",
      options: {
        1: 'resetPassword',
        2: 'updateProfile',
        3: 'start',
      },
    },
    resetPassword: {
      message: "To reset your password, click on 'Forgot Password' on the login page. Returning to Main Menu.",
      options: {
        1: 'start',
      },
    },
    updateProfile: {
      message: "To update your profile, go to the settings page in your account. Returning to Main Menu.",
      options: {
        1: 'start',
      },
    },
    technicalSupport: {
      message: "You selected Technical Support. How can we assist you?\n1. App Not Working\n2. Report a Bug\n3. Back to Main Menu",
      options: {
        1: 'appNotWorking',
        2: 'reportBug',
        3: 'start',
      },
    },
    appNotWorking: {
      message: "If the app is not working, try restarting it or updating to the latest version. Returning to Main Menu.",
      options: {
        1: 'start',
      },
    },
    reportBug: {
      message: "To report a bug, please email support@example.com. Returning to Main Menu.",
      options: {
        1: 'start',
      },
    },
    pricingDetails: {
      message: "You can find pricing details at example.com/pricing. Returning to Main Menu.",
      options: {
        1: 'start',
      },
    },
    helpAndSupport: {
      message: "If you need further assistance, please visit our Help & Support page to raise a support request:\n[Help & Support](http://localhost:3000/help).",
      options: {},
    },
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage = input.trim();
      const newUserMessage = {
        text: userMessage,
        sender: 'You',
        timestamp: new Date(),
      };

      setMessages([...messages, newUserMessage]);
      setInput('');

      // Process user's response
      setTimeout(() => {
        const step = conversationFlow[currentStep];
        const nextStepKey = step.options[userMessage];

        if (nextStepKey) {
          const botMessage = {
            text: conversationFlow[nextStepKey].message,
            sender: 'Bot',
            timestamp: new Date(),
          };

          setMessages((prevMessages) => [...prevMessages, botMessage]);
          setCurrentStep(nextStepKey);
        } else {
          const botMessage = {
            text: "Invalid option. Please select a valid number from the menu.",
            sender: 'Bot',
            timestamp: new Date(),
          };

          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
      }, 1000);
    }
  };

  // Scroll to the latest message whenever a new message is added
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Display the initial message when the component loads
  useEffect(() => {
    const initialMessage = {
      text: conversationFlow.start.message,
      sender: 'Bot',
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  }, [conversationFlow.start.message]);

  return (
    <div className="container mt-5">
      <h2>Chat</h2>
      <div
        ref={chatBoxRef}
        className="chat-box border p-3"
        style={{ height: '300px', overflowY: 'scroll' }}
      >
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.sender}: </strong>
            {msg.text.includes('[Help & Support]') ? (
              <a href="http://localhost:3000/help" target="_blank" rel="noopener noreferrer">
                Help & Support
              </a>
            ) : (
              msg.text
            )}
            <small className="text-muted d-block">{msg.timestamp.toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
      <div className="input-group mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your choice..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button className="btn btn-primary" onClick={handleSendMessage}>
          Send
        </button>
      </div>
      <button className="btn btn-danger mt-3" onClick={() => setMessages([])}>
        Clear Chat
      </button>
    </div>
  );
};

export default Chat;