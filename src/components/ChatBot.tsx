import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import MessageList from '@/components/MessageList';
import ChatInput from '@/components/ChatInput';
import ActionButtons from '@/components/ActionButtons';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

interface ChatBotProps {
  isLoading: boolean;
  messages: Message[];
  onSendMessage: (content: string) => Promise<void>;
}

const ChatBot = ({ isLoading, messages, onSendMessage }: ChatBotProps) => {
  return (
    <div className="h-full flex flex-col">
      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md px-4 space-y-4">
            <div>
              <h1 className="mb-8 text-4xl font-semibold text-center">What can I help with?</h1>
              <ChatInput onSend={onSendMessage} isLoading={isLoading} />
            </div>
            <ActionButtons />
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto">
            <MessageList messages={messages} />
          </div>
          <div className="p-4">
            <ChatInput onSend={onSendMessage} isLoading={isLoading} />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBot;