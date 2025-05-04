import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Minimize2, Maximize2, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import useFetch from "@/hooks/useFetch";

export const ChatbotBubble = () => {
  const { post, loading, error, data } = useFetch();
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      content:
        "Halo! Selamat datang di SahamPedia AI Assistant. Ada yang bisa saya bantu tentang saham blue chip Indonesia?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isFullscreen) setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) {
      toast.error("Pesan kosong", {
        description: "Silakan tulis pesan Anda terlebih dahulu",
        action: {
          label: "OK",
        },
      });
      return;
    }

    const newUserMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    const body = {
      sender: "user",
      message: inputMessage,
    };
    post("http://localhost:5005/webhooks/rest/webhook", body);
    setInputMessage("");
  };

  useEffect(() => {
    if (!loading && data && data.length > 0) {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        content: data[0].text,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Terjadi kesalahan", {
        description: "Gagal terhubung dengan server chatbot.",
        action: {
          label: "OK",
        },
      });

      const errorResponse = {
        id: Date.now().toString(),
        content:
          "Maaf, saya tidak dapat menjawab saat ini. Silakan coba lagi nanti.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorResponse]);
    }
  }, [error]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        isFullscreen ? "w-full h-full inset-0 bottom-0 right-0" : "w-auto"
      }`}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Button
              onClick={toggleChat}
              className="h-14 w-14 rounded-full bg-gradient-to-r cursor-pointer from-violet-500 via-violet-600 to-purple-700 hover:from-violet-600 hover:to-purple-800 shadow-lg hover:shadow-violet-500/25 flex items-center justify-center group transition-all duration-300"
            >
              <MessageSquare className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={isFullscreen ? "h-full" : ""}
          >
            <Card
              className={`overflow-hidden backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border-violet-200 dark:border-violet-900 shadow-2xl transition-all duration-300 ${
                isFullscreen
                  ? "w-full h-full rounded-none flex flex-col"
                  : "w-80 md:w-96 h-[500px] rounded-2xl"
              }`}
            >
              <CardHeader className="bg-gradient-to-r from-violet-500 via-violet-600 to-purple-700 p-4 relative flex-shrink-0">
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      initial={{ rotate: -180 }}
                      animate={{ rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                    >
                      <MessageSquare className="h-5 w-5 text-white" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white">
                      SahamPedia AI Assistant
                    </h3>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleFullscreen}
                      className="h-8 w-8 rounded-lg cursor-pointer hover:bg-white/10 text-white"
                    >
                      <Minimize2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleChat}
                      className="h-8 w-8 rounded-lg cursor-pointer hover:bg-white/10 text-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent
                className={`p-4 ${
                  isFullscreen
                    ? "flex-grow flex flex-col h-[calc(50vh-4.5rem)]"
                    : "h-[calc(100%-4rem)]"
                } flex flex-col`}
              >
                <ScrollArea className="flex-grow mb-4 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 p-4 backdrop-blur-sm overflow-y-auto">
                  <div className="pr-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        className={`chat-message mb-4 flex ${
                          message.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                      >
                        <div className="flex flex-col items-start max-w-[80%]">
                          <div
                            className={`text-xs mb-1 px-1 ${
                              message.sender === "user"
                                ? "text-right self-end text-violet-500"
                                : "text-left text-violet-600"
                            }`}
                          >
                            <span className="font-semibold">
                              {message.sender === "user" ? "User" : "Bot"}
                            </span>{" "}
                            •{" "}
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                          <div
                            className={`p-3 rounded-2xl ${
                              message.sender === "user"
                                ? "bg-violet-500 text-white rounded-tr-none self-end"
                                : "bg-violet-100 dark:bg-violet-900/50 text-gray-800 dark:text-gray-200 rounded-tl-none"
                            }`}
                          >
                            <p>{message.content}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <motion.div
                  className="flex items-center space-x-2 flex-shrink-0"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Input
                    placeholder="Ketik pesan Anda di sini..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                    className="flex-grow bg-gray-50/50 dark:bg-gray-800/50 border-violet-200 dark:border-violet-900 focus:ring-violet-500 dark:focus:ring-violet-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={loading}
                    className="bg-gradient-to-r from-violet-500 to-purple-600 cursor-pointer hover:from-violet-600 hover:to-purple-700 text-white shadow-lg hover:shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
