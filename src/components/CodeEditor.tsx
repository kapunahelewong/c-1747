import { Textarea } from '@/components/ui/textarea';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

const CodeEditor = ({ code, onChange }: CodeEditorProps) => {
  return (
    <div className="h-full p-4 bg-[#1e1e1e]">
      <Textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full bg-transparent text-white font-mono resize-none focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
        placeholder="Write your React component here..."
      />
    </div>
  );
};

export default CodeEditor;