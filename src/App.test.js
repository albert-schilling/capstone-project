import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders "Ciceroic"', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/Ciceroic/i)
  expect(linkElement).toBeInTheDocument()
})
