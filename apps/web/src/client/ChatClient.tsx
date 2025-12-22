"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, CornerDownLeft, Mail, FileText, Loader2, ExternalLink } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

interface Source {
  type: "email" | "drive";
  title: string;
  gmail_id?: string;
  file_id?: string;
}

interface MessageResponse {
  message: string;
  sources: Source[];
  conversation_id: string;
}

interface ChatClientProps {
  conversationId: string;
}

export default function Chat({ conversationId }: ChatClientProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lastUserMessageRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [title, setTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [bottomPadding, setBottomPadding] = useState(0);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `/api/chat/fetch?conversation_id=${conversationId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch conversation");
        }

        const data: Conversation = await response.json();
        setTitle(data.title);
        setMessages(data.messages);
      } catch (err) {
        console.error("Error fetching conversation:", err);
        setError("Failed to load conversation");
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversation();
  }, [conversationId]);

  // Calculate padding to position newest user message at top with leading space
  useEffect(() => {
    const calculatePadding = () => {
      if (!lastUserMessageRef.current || !messagesContainerRef.current) return;

      const desiredTopOffset = 10;
      
      // Get viewport height
      const viewportHeight = window.innerHeight;
      
      // Account for the fixed chatbox at bottom
      const chatboxHeight = 0;
      
      // Get the user message position in the container
      const userMessageTop = lastUserMessageRef.current.offsetTop;
      
      // Get the total height of the container content
      const containerHeight = messagesContainerRef.current.scrollHeight;
      
      // Calculate content height from user message to end of container
      const contentBelowUserMessage = containerHeight - userMessageTop;
      
      // Calculate required padding: we need enough space so that when the user message
      // is at desiredTopOffset from top, there's room for the assistant response
      // but not excessive empty space
      const availableViewportSpace = viewportHeight - desiredTopOffset - chatboxHeight;
      const padding = Math.max(0, availableViewportSpace - contentBelowUserMessage);
      
      setBottomPadding(padding);
      
      // Scroll to position the message at the top with offset after layout settles
      setTimeout(() => {
        const messageOffsetFromTop = lastUserMessageRef.current?.offsetTop;
        if (messageOffsetFromTop !== undefined) {
          window.scrollTo({
            top: messageOffsetFromTop - desiredTopOffset,
            behavior: "smooth",
          });
        }
      }, 100);
    };

    calculatePadding();
    
    // Recalculate on window resize
    window.addEventListener("resize", calculatePadding);
    return () => window.removeEventListener("resize", calculatePadding);
  }, [messages]);

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  const handleSubmit = async () => {
    const message = inputValue.trim();
    if (!message || isSending) return;

    // Add user message to state immediately
    const userMessage: Message = {
      role: "user",
      content: message,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    setIsSending(true);

    try {
      const response = await fetch("/api/chat/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversation_id: conversationId,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data: MessageResponse = await response.json();

      // Add assistant response to state
      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
        sources: data.sources,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
      // Add error message
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error processing your request. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Get icon for source type
  const getSourceIcon = (type: Source["type"]) => {
    switch (type) {
      case "email":
        return <Mail size={14} />;
      case "drive":
        return <FileText size={14} />;
      default:
        return <FileText size={14} />;
    }
  };

  // Render sources
  const renderSources = (sources: Source[]) => {
    if (!sources || sources.length === 0) return null;

    return (
      <div className="mt-4 flex flex-wrap gap-2">
        {sources.map((source, index) => (
          <a
            key={index}
            href="#"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-(--card-background) border border-(--border) rounded-md hover:border-(--primary) transition-colors group"
          >
            <span className="text-(--muted) group-hover:text-(--primary)">
              {getSourceIcon(source.type)}
            </span>
            <span className="truncate max-w-[150px]">{source.title}</span>
            <ExternalLink size={12} className="text-(--muted) group-hover:text-(--primary)" />
          </a>
        ))}
      </div>
    );
  };

  // Group messages into pairs (user + assistant)
  const pairMessages = () => {
    const pairs: Message[][] = [];
    let currentPair: Message[] = [];

    messages.forEach((message, index) => {
      currentPair.push(message);

      if (message.role === "assistant" || index === messages.length - 1) {
        pairs.push([...currentPair]);
        currentPair = [];
      }
    });
    return pairs;
  };

  const messagePairs = pairMessages();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="font-mono">Loading conversation...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="font-mono text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center px-8">
      <div className="w-full max-w-3xl py-16 px-10">
        {/* Title */}
        {title && (
          <h1 className="text-2xl font-bold mb-8 font-slab">{title}</h1>
        )}

        {/* Messages */}
        <div 
          ref={messagesContainerRef}
          className="w-full flex flex-col gap-12 font-slab"
          style={{ paddingBottom: `${bottomPadding}px` }}
        >
          {messagePairs.map((pair, pairIndex) => {
            const isLastPair = pairIndex === messagePairs.length - 1;
            return (
              <div
                key={pairIndex}
                className="flex flex-col gap-6"
              >
                {pair.map((message, msgIndex) => (
                  <div
                    key={`${pairIndex}-${msgIndex}`}
                    ref={message.role === "user" && isLastPair ? lastUserMessageRef : null}
                    className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`p-3 max-w-full ${message.role === "user" ? "bg-(--card-background) rounded-md border border-(--border)" : ""}`}
                    >
                      {message.content}
                    </div>
                    {message.role === "assistant" && message.sources && renderSources(message.sources)}
                  </div>
                ))}
              </div>
            );
          })}
          
          {/* Loading indicator */}
          {isSending && (
            <div className="flex items-center gap-2 text-(--muted)">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-sm">Celestia is thinking...</span>
            </div>
          )}
        </div>

        {/* Bottom Chatbox */}
        <div className="fixed bottom-0 left-0 flex py-16 justify-center bg-transparent w-screen pointer-events-none px-4">
          <div className="relative border border-(--border) bg-(--background) rounded-xl w-full px-4 py-3 max-w-3xl pointer-events-auto shadow-md/75">
            <textarea
              ref={textareaRef}
              rows={2}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Prompt Celestia..."
              disabled={isSending}
              className="w-full bg-transparent outline-none resize-none max-h-32 overflow-y-auto mb-10 disabled:opacity-50"
            />
            <div className="absolute bottom-2 left-2 flex gap-2">
              <button className="cursor-pointer text-(--muted) bg-(--background) border border-(--border) p-1.5 rounded-md hover:border-(--primary) transition-colors">
                <Plus size={18} />
              </button>
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSending || !inputValue.trim()}
              className="absolute bottom-2 right-2 cursor-pointer text-(--light-background-text) bg-(--primary) border border-(--primary-border) p-1.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              {isSending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <CornerDownLeft size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
