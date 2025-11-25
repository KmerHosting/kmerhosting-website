"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { X, Send, MessageCircle } from "lucide-react";

interface Department {
  id: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
}

interface ChatMessage {
  id: string;
  message: string;
  senderType: "visitor" | "agent";
  senderName: string;
  createdAt: string;
}

interface ChatSession {
  id: string;
  visitorName: string;
  status: "waiting" | "active" | "closed";
  createdAt: string;
}

export default function LiveChatPage() {
  const { toast } = useToast();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [formData, setFormData] = useState({
    visitorName: "",
    visitorEmail: "",
    visitorPhone: "",
    departmentId: "",
    subject: "",
  });
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingDeps, setFetchingDeps] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [pollInterval, setPollInterval] = useState<NodeJS.Timeout | null>(null);

  // Fetch departments on mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("/api/chat/departments");
        if (response.ok) {
          const data = await response.json();
          setDepartments(data.departments || []);
        }
      } catch (error) {
        console.error("Failed to fetch departments:", error);
        toast({
          title: "Error",
          description: "Failed to load departments",
          variant: "destructive",
        });
      } finally {
        setFetchingDeps(false);
      }
    };

    fetchDepartments();
  }, [toast]);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Poll for new messages
  useEffect(() => {
    if (!chatSession) return;

    const pollMessages = async () => {
      try {
        const response = await fetch(`/api/chat/sessions/${chatSession.id}`);
        if (response.ok) {
          const data = await response.json();
          setMessages(data.messages || []);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    const interval = setInterval(pollMessages, 2000); // Poll every 2 seconds
    setPollInterval(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [chatSession]);

  const handleStartChat = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.visitorName || !formData.visitorEmail || !formData.departmentId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/chat/start-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorName: formData.visitorName,
          visitorEmail: formData.visitorEmail,
          visitorPhone: formData.visitorPhone || undefined,
          departmentId: formData.departmentId,
          subject: formData.subject || "General Inquiry",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to start chat");
      }

      const data = await response.json();
      setChatSession({
        id: data.sessionId,
        visitorName: formData.visitorName,
        status: "waiting",
        createdAt: new Date().toISOString(),
      });

      // Fetch initial messages
      const messagesResponse = await fetch(
        `/api/chat/sessions/${data.sessionId}`
      );
      if (messagesResponse.ok) {
        const messagesData = await messagesResponse.json();
        setMessages(messagesData.messages || []);
      }
    } catch (error) {
      console.error("Error starting chat:", error);
      toast({
        title: "Error",
        description: "Failed to start chat session",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !chatSession) return;

    const message = newMessage;
    setNewMessage("");

    try {
      const response = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: chatSession.id,
          message,
          senderType: "visitor",
          senderName: formData.visitorName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Fetch updated messages
      const messagesResponse = await fetch(
        `/api/chat/sessions/${chatSession.id}`
      );
      if (messagesResponse.ok) {
        const messagesData = await messagesResponse.json();
        setMessages(messagesData.messages || []);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  const handleCloseChat = async () => {
    if (!chatSession) return;

    try {
      const response = await fetch(
        `/api/chat/sessions/${chatSession.id}/close`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        }
      );

      if (response.ok) {
        setChatSession(null);
        setMessages([]);
        setFormData({
          visitorName: "",
          visitorEmail: "",
          visitorPhone: "",
          departmentId: "",
          subject: "",
        });
        if (pollInterval) clearInterval(pollInterval);
        toast({
          title: "Success",
          description: "Chat session closed",
        });
      }
    } catch (error) {
      console.error("Error closing chat:", error);
      toast({
        title: "Error",
        description: "Failed to close chat",
        variant: "destructive",
      });
    }
  };

  if (!chatSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-6 h-6" />
                <CardTitle>Start a Live Chat</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleStartChat} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.visitorName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        visitorName: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.visitorEmail}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        visitorEmail: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.visitorPhone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        visitorPhone: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  {fetchingDeps ? (
                    <div className="text-sm text-gray-500">Loading departments...</div>
                  ) : (
                    <Select
                      value={formData.departmentId}
                      onValueChange={(value) =>
                        setFormData({ ...formData, departmentId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject (Optional)
                  </label>
                  <Input
                    type="text"
                    placeholder="Brief subject of your inquiry"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subject: e.target.value,
                      })
                    }
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading || fetchingDeps}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? "Starting Chat..." : "Start Chat"}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>📞 Available:</strong> Our support team is here to help! Average
                  response time is under 2 minutes.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl h-[600px] flex flex-col">
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg flex flex-row items-center justify-between">
            <div>
              <CardTitle>Live Chat Support</CardTitle>
              <p className="text-blue-100 text-sm">
                Status: {chatSession.status === "waiting" ? "⏳ Waiting for agent..." : "✅ Connected"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCloseChat}
              className="text-white hover:bg-blue-600"
            >
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>

          {/* Messages Area */}
          <CardContent className="flex-1 overflow-y-auto bg-white p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.senderType === "visitor" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.senderType === "visitor"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  {msg.senderType === "agent" && (
                    <p className="text-xs font-semibold mb-1">{msg.senderName}</p>
                  )}
                  <p className="text-sm">{msg.message}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.senderType === "visitor"
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Message Input */}
          <div className="border-t bg-gray-50 p-4 rounded-b-lg">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={chatSession.status === "closed"}
                className="resize-none"
                rows={2}
              />
              <Button
                type="submit"
                disabled={chatSession.status === "closed" || !newMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
