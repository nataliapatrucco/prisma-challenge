import React, { useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form/Form'
import PrismaViewer from './components/PrismaViewer/PrismaViewer'

interface PrismaModel {
  id: number
  name: string
  fields: {
    name: string
    type: string
    metadata: string
  }[]
}

const App: React.FC = () => {
  const [prismaModels, setPrismaModels] = useState<PrismaModel[]>([])

  useEffect(() => {
    const storedModels = localStorage.getItem('prismaModels')
    if (storedModels) {
      const parsedModels: PrismaModel[] = JSON.parse(storedModels)
      setPrismaModels(parsedModels)
    }
  }, [])

  const addPrismaModel = (model: PrismaModel) => {
    setPrismaModels((prevModels) => [...prevModels, model])
    localStorage.setItem(
      'prismaModels',
      JSON.stringify([...prismaModels, model]),
    )
  }

  return (
    <div className="App-header">
      <h1 style={{ color: '#718096' }}>Create Prisma Models</h1>
      <div className="container">
        <Form addPrismaModel={addPrismaModel} />
        <PrismaViewer prismaModels={prismaModels} />
      </div>
    </div>
  );
}

export default App
