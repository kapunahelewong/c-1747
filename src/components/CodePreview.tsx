interface CodePreviewProps {
  code: string;
}

const CodePreview = ({ code }: CodePreviewProps) => {
  const getPreviewContent = () => {
    // Transform the code to remove export default
    const transformedCode = code.replace(/export default .*?;?$/m, '');
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            ${transformedCode}
            
            ReactDOM.render(
              <ExampleComponent />,
              document.getElementById('root')
            );
          </script>
        </body>
      </html>
    `;
  };

  return (
    <div className="h-full bg-white">
      <iframe
        srcDoc={getPreviewContent()}
        className="w-full h-full border-none"
        sandbox="allow-scripts"
        title="Preview"
      />
    </div>
  );
};

export default CodePreview;