import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import ActionButtons from '@/components/ActionButtons';
import MessageList from '@/components/MessageList';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Textarea } from '@/components/ui/textarea';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('// Write your code here');
  const { toast } = useToast();

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const newMessages = [
        ...messages,
        { role: 'user', content } as const
      ];
      
      setMessages(newMessages);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const assistantMessage: Message = {
        role: 'assistant',
        content: "I am a hardcoded response. The database connection has been removed for testing purposes. You can modify this response in the Index.tsx file."
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onApiKeyChange={() => {}}
      />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <ChatHeader isSidebarOpen={isSidebarOpen} />
        
        <div className="flex h-[calc(100vh-60px)] pt-[60px]">
          <ResizablePanelGroup direction="horizontal">
            {/* Chat Panel */}
            <ResizablePanel defaultSize={30} minSize={20}>
              <div className="h-full flex flex-col">
                {messages.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-md px-4 space-y-4">
                      <div>
                        <h1 className="mb-8 text-4xl font-semibold text-center">What can I help with?</h1>
                        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
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
                      <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
                    </div>
                  </>
                )}
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Code Editor Panel */}
            <ResizablePanel defaultSize={35} minSize={30}>
              <div className="h-full p-4 bg-[#1e1e1e]">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full bg-transparent text-white font-mono resize-none focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
                  placeholder="Write your code here..."
                />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Preview Panel */}
            <ResizablePanel defaultSize={35} minSize={30}>
              <div className="h-full p-4 bg-white">
                <iframe
                  srcDoc={`
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <style>
                          body { margin: 0; font-family: sans-serif; }
                        </style>
                      </head>
                      <body>
                        <script>
                          try {
                            ${code}
                          } catch (error) {
                            document.body.innerHTML = '<pre style="color: red;">' + error + '</pre>';
                          }
                        </script>
                      </body>
                    </html>
                  `}
                  className="w-full h-full border-none"
                  sandbox="allow-scripts"
                  title="Code Preview"
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </main>
    </div>
  );
};

export default Index;