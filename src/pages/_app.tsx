import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../chakra/theme'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout/Layout'
import { RecoilRoot } from 'recoil'
import { Icon } from '@chakra-ui/icons'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme} >
        <Layout icon={Icon}>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  )
}
