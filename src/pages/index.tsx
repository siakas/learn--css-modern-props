import type { NextPage } from 'next'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <Box>
      <Stack spacing={6}>
        <Heading as="h1" size="2xl">
          新しいプロパティで書けるスタイル
        </Heading>

        <Text>
          IE11 の非推奨にはじまり、あらたな CSS
          のプロパティが次々にモダンブラウザへ実装されているため、同じ見た目を実現するにも、よりシンプルに・よりスマートに書くことができるようになってきている。
        </Text>

        <Text>それらのサンプル集をまとめていく。</Text>

        <Text>トップページらしいコンポーネントを置きたい。</Text>
      </Stack>
    </Box>
  )
}

export default Home
