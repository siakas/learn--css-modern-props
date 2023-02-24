import NextLink from 'next/link'
import type { FC, ReactNode } from 'react'
import { Box, Container, Link, List, ListItem } from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <Container minW={{ base: '0', md: '7xl' }}>
      <Box display={{ base: 'block', md: 'flex' }} gap={8}>
        <Box as="nav" width={{ base: '100%', md: 'xs' }} p={6} flexShrink={0}>
          <List spacing={4} styleType="none">
            <ListItem>
              <Link as={NextLink} href="/" display="block">
                トップページ
              </Link>
            </ListItem>
            <ListItem>
              <Link as={NextLink} href="/sample" display="block">
                サンプルサンプルサンプルサンプルサンプルサンプルサンプル
              </Link>
            </ListItem>
          </List>
        </Box>
        <Box as="main" p={6}>
          {children}
        </Box>
      </Box>
    </Container>
  )
}

export default DefaultLayout
