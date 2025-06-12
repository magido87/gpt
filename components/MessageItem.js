import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

function MessageItem({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`chat ${isUser ? 'chat-end' : 'chat-start'}`}>
      <div className={`chat-bubble ${isUser ? 'chat-bubble-primary' : ''}`}>
        {isUser ? (
          <p>{msg.content}</p>
        ) : (
          <ReactMarkdown rehypePlugins={[rehypeSanitize]} remarkPlugins={[remarkGfm]}>
            {msg.content}
          </ReactMarkdown>
        )}
        {!isUser && msg.promptTokens !== undefined && (
          <div className="text-xs opacity-70 mt-2">
            Tokens: {msg.promptTokens} prompt + {msg.completionTokens} answer ={' '}
            {msg.promptTokens + msg.completionTokens}. Cost: $
            {msg.cost.toFixed(6)}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(MessageItem);
