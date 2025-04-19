import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "👋 Hello! I'm AgriBot, your farming assistant. How can I help you today?", user: false }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const BACKEND_URL = 'http://localhost:5000'; // Ensure this matches your Flask backend URL

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    setMessages(prev => [...prev, { text: input, user: true }]);
    setInput('');
    setIsTyping(true);

    try {
      // Send user message to the ML model API
      const response = await axios.post(`${BACKEND_URL}/ask`, { query: input });
      const botResponse = response.data.response;
      setMessages(prev => [...prev, { text: botResponse, user: false }]);
    } catch (error) {
      console.error("Error fetching response from API:", error);
      setMessages(prev => [...prev, { text: "Sorry, I encountered an error. Please try again later.", user: false }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl bg-primary hover:bg-primary/90"
              onClick={() => setIsOpen(true)}
              aria-label="Open chat assistant"
            >
              <Sparkles className="h-6 w-6 absolute" />
              <Bot className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col"
            style={{ maxHeight: 'calc(100vh - 80px)', maxWidth: 'calc(100vw - 40px)' }}
          >
            <Card className="w-full max-w-md h-full shadow-xl flex flex-col border border-primary/20 overflow-hidden rounded-2xl bg-card/95 backdrop-blur-sm">
              <CardHeader className="bg-primary text-primary-foreground py-3 px-4 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-medium flex items-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
                  >
                    <Bot className="mr-2 h-5 w-5" />
                  </motion.div>
                  AgriBot Assistant
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
                <ScrollArea className="flex-1 p-4 overflow-y-auto" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <motion.div
                        key={index}
                        className={`flex ${msg.user ? 'justify-end' : 'justify-start'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] p-3 rounded-2xl shadow-sm",
                            msg.user
                              ? "bg-primary text-primary-foreground rounded-tr-none"
                              : "bg-muted text-foreground rounded-tl-none"
                          )}
                        >
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                      <motion.div
                        className="flex justify-start"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="bg-muted text-foreground rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                          <span className="flex space-x-1">
                            <motion.span
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.1 }}
                              className="h-2 w-2 bg-primary rounded-full inline-block"
                            />
                            <motion.span
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.2 }}
                              className="h-2 w-2 bg-primary rounded-full inline-block"
                            />
                            <motion.span
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.3 }}
                              className="h-2 w-2 bg-primary rounded-full inline-block"
                            />
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </ScrollArea>
                <div className="p-3 border-t bg-card/80 backdrop-blur-sm flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder={t('chatPlaceholder')}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="flex-1 rounded-full border-primary/20 focus-visible:ring-primary"
                    />
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        size="icon"
                        className="rounded-full bg-primary hover:bg-primary/90"
                        onClick={handleSendMessage}
                        aria-label="Send message"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;