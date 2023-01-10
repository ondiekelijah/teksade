import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en' className='dark'>
        <Head>
          <link href='/favicons/site.webmanifest' rel='manifest' />
          <link href='/favicons/favicon.ico' rel='shortcut icon' />
          <link
            href='/favicons/apple-touch-icon.png'
            rel='apple-touch-icon'
            sizes='180x180'
          />
          <link
            href='/favicons/favicon-32x32.png'
            rel='icon'
            sizes='32x32'
            type='image/png'
          />
          <link
            href='/favicons/favicon-16x16.png'
            rel='icon'
            sizes='16x16'
            type='image/png'
          />
          <link
            rel='mask-icon'
            href='/favicons/safari-pinned-tab.svg'
            color='#6366f1'
          />
          <meta content='#ffffff' name='theme-color' />
          <meta content='#ffffff' name='msapplication-TileColor' />
          <meta
            content='/favicons/browserconfig.xml'
            name='msapplication-config'
          />
        </Head>
        <body className='dark:highlight-white/5 bg-neutral-100 text-slate-900 antialiased dark:bg-gray-800 dark:text-white'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
