import React from 'react'
import { action } from '@storybook/addon-actions'

import Settings from './Settings'

export default {
  title: 'Components/Settings',
  component: Settings,
}

const profile = {
  _id: '23p48qyfguisrhgfiu',
  email: 'maxpower@heroes.world',
  password: 'skdflksdjfgiu',
  firstName: 'Max',
  lastName: 'Power',
  portrait: '',
  about:
    'I joined Ciceroic because I might be a great hero but I am not a heroic speaker.',
}

export const DefaultSettings = () => {
  return <Settings profile={profile} logOut={action('Log out user.')} />
}