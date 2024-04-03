import { EnforceFooBar } from './enforce-foo-bar.js'

export const customRulePlugin = {
  rules: {
    'enforce-foo-bar': EnforceFooBar,
  },
}
