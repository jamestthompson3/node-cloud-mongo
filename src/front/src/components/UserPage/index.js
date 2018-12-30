import * as React from 'react'
import styled from 'styled-components'
import request from 'superagent'
import Dropzone from 'react-dropzone'

import FilesList from './components/FilesList'

const PathHeader = styled.h1`
  font-size: 36px;
  color: ${p => p.theme.primaryColor};
`

const DropzoneIndicator = styled.div`
  background: ${p => (p.active ? 'rgba(109, 110, 112, 0.35)' : 'transparent')};
  width: 100%;
  height: 100%;
`

const ProgressBarWrapper = styled.div`
  position: absolute
  border-radius: 30px;
  width: 85%;
  left: 5%;
  top: 30%;
  background: rgba(0,0,0,0.5);
  height: 60px;
`

const ProgressBarCore = styled.div`
  height: 60px;
  border-radius: 30px;
  background: #bada55;
  width: ${p => `${p.progress}%`};
`

const testFiles = [
  { fileName: 'output.txt', dateModified: '2018-05-13' },
  { fileName: 'readme.md', dateModified: '2018-07-11' },
  { fileName: 'term-paper.doc', dateModified: '2018-07-13' },
  { fileName: 'coolPhoto.jpg', dateModified: '2018-08-14' },
  { fileName: 'spreadsheet.csv', dateModified: '2018-09-18' },
  {
    directoryName: 'school stuff',
    dateModified: '2018-09-18',
    files: [
      { fileName: 'assignment1.docx', dateModified: '2017-06-25' },
      { fileName: 'BUS 1011 Final Paper.docx', dateModified: '2016-3-22' }
    ]
  }
]

class UserPage extends React.Component {
  state = {
    filePath: '',
    dropzoneActive: false,
    status: 'SUCCESS',
    percent: 0
  }

  componentDidMount() {
    const {
      location: { pathname }
    } = this.props
    this.setState({ filePath: pathname.replace('/', '') })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      const {
        location: { pathname }
      } = this.props
      this.setState({ filePath: pathname.replace('/', '') })
    }
  }

  onDragEnter = () => this.setState({ dropzoneActive: true })

  onDragLeave = () => this.setState({ dropzoneActive: false })

  onDrop = files => {
    this.setState({ status: 'UPLOAD' })
    files.forEach(file =>
      request
        .post('/api/files/')
        .attach(file.name, file)
        .on('progress', ({ percent }) => this.setState({ percent }))
        .then(res => this.setState({ dropzoneActive: false, status: 'SUCCESS' }))
        .catch(err => this.setState({ status: 'ERROR', dropzoneActive: false }))
    )
  }

  render() {
    const { filePath, dropzoneActive, percent, status } = this.state
    return (
      <Dropzone
        disableClick
        style={{ position: 'relative', width: '100%', height: '100%' }}
        onDrop={this.onDrop}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
      >
        <PathHeader>{filePath}</PathHeader>
        <DropzoneIndicator active={dropzoneActive}>
          <FilesList files={testFiles} />
          {status === 'UPLOAD' && (
            <ProgressBarWrapper id="progress">
              <ProgressBarCore progress={percent} />
            </ProgressBarWrapper>
          )}
          {status === 'ERROR' && (
            <h3 style={{ color: 'red' }}>Something went wrong, please try again</h3>
          )}
        </DropzoneIndicator>
      </Dropzone>
    )
  }
}

export default UserPage
