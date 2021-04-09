import React from 'react'
import ***REMOVED*** render ***REMOVED*** from '@vtex/test-tools/react'

import Greeting from './Greeting'

test('greets Fred', () => ***REMOVED***
  const ***REMOVED*** queryByText ***REMOVED*** = render(<Greeting name="Fred" />)

  expect(queryByText('Hey, Fred')).toBeInTheDocument()
***REMOVED***)
