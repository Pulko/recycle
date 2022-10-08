import type { AppProps } from 'next/app'
import Meta from 'components/meta'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-black">
      <Meta />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
