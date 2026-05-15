"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Paperclip, 
  User, 
  CheckCircle2, 
  X, 
  FileText, 
  Upload,
  ArrowLeft,
  MessageSquare
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  type?: "text" | "file";
  files?: { name: string; size: number }[];
}

const WhatsAppChatAutomation = ({ onBack }: { onBack: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    symptoms: "",
    currentDiagnosis: "",
    questions: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasInitialMessageSent = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const questions = [
    "Hi! I'm your virtual assistant for the FREE Second Opinion service. To get started, what is the **Patient's Full Name**?",
    "Thank you. Please provide your **Email Address** so we can send the specialist's report.",
    "And your **Phone Number**? (e.g., +91 98765 43210)",
    "What is the patient's **Age and Gender**? (e.g., 45, Male)",
    "Please describe the **Symptoms** or health issues in detail.",
    "Is there any **Current Diagnosis**? (Type 'None' if not applicable)",
    "Do you have any specific **Questions** for the doctor? (Type 'None' if none)",
    "Please upload any **Medical Reports** (PDF/Images). You can use the attachment icon or skip this step by typing 'Skip'.",
  ];

  useEffect(() => {
    if (hasInitialMessageSent.current) return;
    hasInitialMessageSent.current = true;
    sendBotMessage(questions[0]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const sendBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Math.random().toString(),
        sender: "bot",
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, newMessage]);
      setIsTyping(false);
      setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
      }, 100);
    }, 1500);
  };

  const handleSend = async () => {
    if (!inputValue.trim() && files.length === 0) return;

    const userText = inputValue.trim();
    setInputValue("");

    // Add user message
    const userMessage: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: userText || `Uploaded ${files.length} file(s)`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: files.length > 0 ? "file" : "text",
      files: files.map(f => ({ name: f.name, size: f.size })),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Save data based on step
    const updatedData = { ...formData };
    if (currentStep === 0) updatedData.patientName = userText;
    if (currentStep === 1) updatedData.email = userText;
    if (currentStep === 2) updatedData.phone = userText;
    if (currentStep === 3) {
      const parts = userText.split(",");
      updatedData.age = parts[0]?.trim() || "";
      updatedData.gender = parts[1]?.trim() || "";
    }
    if (currentStep === 4) updatedData.symptoms = userText;
    if (currentStep === 5) updatedData.currentDiagnosis = userText;
    if (currentStep === 6) updatedData.questions = userText;
    
    setFormData(updatedData);

    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);

    if (nextStep < questions.length) {
      sendBotMessage(questions[nextStep]);
    } else {
      // Final step: Save and show wait message
      await finishAutomation(updatedData);
    }
  };

  const finishAutomation = async (dataToSubmit: typeof formData) => {
    setIsSubmitting(true);
    setIsTyping(true);

    try {
      const data = new FormData();
      Object.entries(dataToSubmit).forEach(([key, value]) => {
        data.append(key, value);
      });
      files.forEach((file) => {
        data.append("reports", file);
      });

      const response = await fetch("/api/second-opinion", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setIsCompleted(true);
        sendBotMessage("Thank you! Your details have been securely collected. Please **wait 1-2 hours**. A senior specialist will review your case and get in touch with you via WhatsApp or Email.");
      } else {
        sendBotMessage("Something went wrong saving your details. But don't worry, we are here. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      sendBotMessage("Failed to submit request. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#F0F2F5] dark:bg-slate-950 rounded-[32px] overflow-hidden shadow-2xl border border-slate-200/50 flex flex-col h-[600px]">
      {/* Chat Header */}
      <div className="bg-brand-teal text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">
            H
          </div>
          <div>
            <h3 className="font-bold text-sm">ML Hospital Assistant</h3>
            <span className="text-xs text-teal-100 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Online
            </span>
          </div>
        </div>
        <MessageSquare size={20} className="opacity-80" />
      </div>

      {/* Chat Messages */}
      <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#E5DDD5] dark:bg-slate-900/50 pattern-bg">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm relative ${
                msg.sender === "user" 
                  ? "bg-brand-teal text-white rounded-br-none" 
                  : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none"
              }`}>
                {msg.type === "file" && msg.files ? (
                  <div className="space-y-2 mb-1">
                    {msg.files.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 bg-black/10 p-2 rounded-xl text-xs">
                        <FileText size={16} />
                        <span className="truncate max-w-[150px]">{f.name}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
                <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                <span className={`text-[10px] block text-right mt-1 opacity-70 ${msg.sender === "user" ? "text-white/80" : "text-slate-400"}`}>
                  {msg.timestamp}
                </span>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Selected Files Preview */}
      {files.length > 0 && currentStep === 7 && (
        <div className="px-6 py-2 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700/50 flex gap-2 overflow-x-auto">
          {files.map((file, index) => (
            <div key={index} className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-full text-xs shrink-0">
              <FileText size={14} className="text-brand-teal" />
              <span className="max-w-[100px] truncate">{file.name}</span>
              <button onClick={() => removeFile(index)} className="p-0.5 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full">
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Chat Input */}
      {!isCompleted && (
        <div className="p-4 bg-[#F0F2F5] dark:bg-slate-900 flex items-center gap-3 border-t border-slate-200/50 dark:border-slate-800/50">
          {currentStep === 7 ? (
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-100 transition-colors shadow-sm"
            >
              <Paperclip size={20} />
              <input 
                type="file" 
                ref={fileInputRef} 
                multiple 
                onChange={handleFileChange} 
                className="hidden" 
              />
            </button>
          ) : null}

          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isSubmitting || isTyping}
            placeholder={
              currentStep === 7 
                ? "Type 'Skip' or upload files above..." 
                : "Type a message..."
            }
            className="flex-1 bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-brand-teal dark:focus:border-brand-teal text-slate-800 dark:text-slate-100 disabled:opacity-50"
          />

          <button
            onClick={handleSend}
            disabled={(!inputValue.trim() && files.length === 0) || isSubmitting || isTyping}
            className="p-3 bg-brand-teal text-white rounded-full hover:brightness-110 active:scale-95 transition-all shadow-md shadow-brand-teal/20 disabled:opacity-50 disabled:scale-100"
          >
            <Send size={18} />
          </button>
        </div>
      )}

      {isCompleted && (
        <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-200/50 text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="text-green-500" size={24} />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Details saved. A team member will be in touch shortly.
          </p>
          <button 
            onClick={onBack}
            className="text-xs font-bold text-brand-teal hover:underline"
          >
            Back to Options
          </button>
        </div>
      )}
    </div>
  );
};

export default WhatsAppChatAutomation;
