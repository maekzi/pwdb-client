// theme/index.js
import { extendTheme } from '@chakra-ui/react'

// Global style overrides
import styles from './styles'
const overrides = {
  styles,
  // Other foundational style overrides go here
  components: {},
}

export default extendTheme(overrides)