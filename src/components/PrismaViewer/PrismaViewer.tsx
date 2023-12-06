import React from 'react'
import './PrismaViewer.css'

interface PrismaViewerProps {
  prismaModels: PrismaModel[]
}

interface PrismaModel {
  id: number
  name: string
  fields: {
    name: string
    type: string
    metadata: string
  }[]
}

const PrismaViewer: React.FC<PrismaViewerProps> = ({ prismaModels }) => {
  return (
    <div className="container">
      {prismaModels.map((model, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#805ad5' }}>{`${model.name} {`}</h4>
          <table style={{ width: '100%' }}>
            <tbody>
              <tr key="id">
                <td
                  style={{ width: '150px', color: '#1a202c', fontSize: '20px' }}
                >
                  id
                </td>
                <td
                  style={{ width: '100px', color: '#805ad5', fontSize: '20px' }}
                >
                  Int
                </td>
                <td
                  style={{ width: '200px', color: '#319795', fontSize: '20px' }}
                >
                  {'@default'}
                </td>
              </tr>
              {model.fields.map((field, fieldIndex) => (
                <tr key={fieldIndex}>
                  <td
                    style={{
                      width: '150px',
                      color: '#1a202c',
                      fontSize: '20px',
                    }}
                  >
                    {field.name}
                  </td>
                  <td
                    style={{
                      width: '100px',
                      color: '#805ad5',
                      fontSize: '20px',
                    }}
                  >
                    {field.type}
                  </td>
                  <td
                    style={{
                      width: '200px',
                      color: '#319795',
                      fontSize: '20px',
                    }}
                  >
                    {field.type}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4 style={{ color: '#805ad5' }}>{'}\n\n'}</h4>
        </div>
      ))}
    </div>
  )
}

export default PrismaViewer
