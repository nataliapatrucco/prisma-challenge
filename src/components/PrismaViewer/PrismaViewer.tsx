import React from 'react';
import './PrismaViewer.css';

interface PrismaViewerProps {
  prismaModels: PrismaModel[];
}

interface PrismaModel {
  name: string;
  fields: {
    name: string;
    type: string;
  }[];
}

const PrismaViewer: React.FC<PrismaViewerProps> = ({ prismaModels }) => {
  return (
    <div className='container'>
      {prismaModels.map((model, index) => (
        <div key={index} style={{marginBottom: '20px'}}>
          <h4 style={{color:'#805ad5'}}>{`${model.name} {`}</h4>
          <table style={{ width: '100%' }}>
            <tbody>
              {model.fields.map((field, fieldIndex) => (
                <tr key={fieldIndex}>
                  <td style={{ width: '150px', color: '#1a202c' }}>{field.name}</td>
                  <td style={{ width: '135px', color: '#805ad5'}}>{field.type}</td>
                  <td style={{ width: '200px', color: '#319795' }}>{field.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4 style={{color:'#805ad5'}}>{'}\n\n'}</h4>
        </div>
      ))}
    </div>
  );
};

export default PrismaViewer;