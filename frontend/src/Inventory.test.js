import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import Inventory from './components/Inventory'

beforeEach(() => {
  localStorage.clear()
  global.fetch = vi.fn((url) => {
    if (url.endsWith('/api/ppe')) {
      return Promise.resolve({ json: () => Promise.resolve([]) })
    }
    return Promise.resolve({ json: () => Promise.resolve([]) })
  })
})

test('renders inventory form and can add an item', async () => {
  render(<Inventory />)

  expect(screen.getByPlaceholderText('Name')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Quantity')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Location')).toBeInTheDocument()

  fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Gloves' } })
  fireEvent.change(screen.getByPlaceholderText('Quantity'), { target: { value: '100' } })
  fireEvent.change(screen.getByPlaceholderText('Location'), { target: { value: 'Warehouse' } })
  fireEvent.click(screen.getByText('Add'))

  await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('/api/ppe', expect.objectContaining({ method: 'POST' })))
})
