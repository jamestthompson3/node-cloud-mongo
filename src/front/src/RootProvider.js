import * as React from 'react'

export const RootContext = React.createContext({})

export class RootProvider extends React.Component {
  state = {
    setCurrentUser: user => this.setState({ user }),
    user: null
  }

  render() {
    const { children } = this.props
    return <RootContext.Provider value={this.state}>{children}</RootContext.Provider>
  }
}

/**
 * Some nested component
 *
 * <RecruitsProvider>
 *    <Table />
 * </RecruitsProvider>
 *
 *
 *
 * in RecruitsProvider.js
 *
 * state = {
 *  user: 'some string'
 * }
 *
 * <RecruitsContext.Provider value={this.state}>{children}</RecruitsContext.Provider>
 *
 *
 * in Table.js
 *
 * class Table extends React.Component {
 *  componentDidMount() {
 *    const { user, fetchUserData } = this.context // ok
 *    fetchUserData(user)
 *  }
 *
 * }
 *
 */
