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
    <div className="Container">
      {prismaModels.map((model, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h5 style={{ color: '#805ad5' }}><span style={{ color: '#d5408c' }}>model </span>{`${model.name} {`}</h5>
          <table style={{ width: '100%' }}>
            <tbody>
              <tr key="id">
                <td className="Name-field">id</td>
                <td className="Type-field">Int</td>
                <td className="Metadata-field">{'@id @default(autoincrement())'}</td>
              </tr>
              {model.fields.map((field, fieldIndex) => (
                <tr key={fieldIndex}>
                  <td className="Name-field">{field.name}</td>
                  <td className="Type-field">{field.type}</td>
                  <td className="Metadata-field">{field.metadata}</td>
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
