import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import App from './App'

beforeEach(() => {
  global.fetch = vi.fn(() => Promise.resolve({ json: () => Promise.resolve([]) }))
  localStorage.clear()
})

test('renders login and allows user to log in', async () => {
  render(<App />)

  expect(screen.getByText('Login')).toBeInTheDocument()
  fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'admin' } })
  fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } })
  fireEvent.click(screen.getByText('Login'))

  expect(await screen.findByText('PPE Inventory App')).toBeInTheDocument()
  expect(localStorage.getItem('authToken')).toBeTruthy()
})
