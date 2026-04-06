import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import Clients from './components/Clients'

beforeEach(() => {
  localStorage.clear()
  global.fetch = vi.fn((url) => {
    if (url.endsWith('/api/clients')) {
      return Promise.resolve({ json: () => Promise.resolve([]) })
    }
    return Promise.resolve({ json: () => Promise.resolve([]) })
  })
})

test('renders clients form and can add a client', async () => {
  render(<Clients />)

  expect(screen.getByPlaceholderText('Name')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Date of Birth')).toBeInTheDocument()

  fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test Client' } })
  fireEvent.change(screen.getByPlaceholderText('Date of Birth'), { target: { value: '1990-01-01' } })
  fireEvent.click(screen.getByText('Add Client'))

  await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('/api/clients', expect.objectContaining({ method: 'POST' })))
})
