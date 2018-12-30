import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { orderBy } from 'lodash'

const FilesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`
const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  font-size: 12px;
  justify-content: flex-start;
  color: ${p => p.theme.primaryColor};
  align-items: baseline;
  p {
    font-size: 10px;
    margin: 0;
  }
`
const FileName = styled.h3`
  cursor: pointer;
  margin-bottom: 0;
  margin-right: 10px;
`

class FilesList extends Component {
  state = {
    open: []
  }

  openFile = file => {
    const {
      history,
      match: { params, url }
    } = this.props
    history.push(`${url}/${file.directoryName ? file.directoryName : file.fileName}`)
    return (
      file.directoryName &&
      this.setState(s => ({
        open: s.open.includes(file.directoryName)
          ? s.open.filter(name => name !== file.directoryName)
          : [...s.open, file.directoryName]
      }))
    )
  }

  getOpenSymbol = directoryName => {
    const { open } = this.state
    return open.includes(directoryName) ? '▼' : '▷'
  }

  render() {
    const {
      files,
      history,
      match: { params, url }
    } = this.props
    const { open } = this.state
    return (
      <FilesWrapper>
        {orderBy(files, 'dateModified').map((file, i) => (
          <DescriptionWrapper key={i}>
            <FileName onClick={() => this.openFile(file)}>
              {file.directoryName ? (
                <Fragment>
                  <span style={{ position: 'relative', left: -8, marginRight: -6 }}>
                    {this.getOpenSymbol(file.directoryName)}
                  </span>
                  {file.directoryName}
                </Fragment>
              ) : (
                file.fileName
              )}
            </FileName>
            <p>{file.dateModified}</p>
            {file.files &&
              open.includes(file.directoryName) &&
              orderBy(file.files, 'dateModified').map(f => (
                <div key={f.fileName}>
                  <FileName>{f.fileName}</FileName>
                  <p>{f.dateModified}</p>
                </div>
              ))}
          </DescriptionWrapper>
        ))}
      </FilesWrapper>
    )
  }
}

export default withRouter(FilesList)
