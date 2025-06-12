import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  try{
    const persisted = JSON.parse(localStorage.getItem('settings')||'{}');
    const theme = persisted?.theme || 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }catch(e){}
})();`
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
