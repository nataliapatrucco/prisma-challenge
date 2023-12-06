import React, { useState, useEffect } from 'react'
import './Form.css'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AiOutlineDelete } from 'react-icons/ai'

interface Field {
  name: string
  type: string
  metadata: string
}

interface Model {
  id: number
  name: string
  fields: Field[]
}

interface FormData {
  models: Model[]
}

enum FieldType {
  Int = 'Int',
  String = 'String',
  Boolean = 'Boolean',
  DateTime = 'DateTime',
}

interface FormProps {
  addPrismaModel: (model: PrismaModel) => void
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

const Form: React.FC<FormProps> = ({ addPrismaModel }) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm<FormData>({
    defaultValues: { models: [] },
  })
  const [idCounter, setIdCounter] = useState<number>(1)

  const models: Model[] = watch('models', [] as Model[])
  const isAddingModel: boolean = models.length === 0

  useEffect(() => {
    const storedCounter = localStorage.getItem('idCounter')
    if (storedCounter) {
      setIdCounter(parseInt(storedCounter, 10))
    }
  }, [])

  const addModel = () => {
    setValue('models', [...models, { id: idCounter, name: '', fields: [] }])
    setIdCounter((prevCounter) => prevCounter + 1)
  }

  const addField = (modelIndex: number) => {
    const updatedModels = [...models]
    updatedModels[modelIndex].fields.push({
      name: '',
      type: FieldType.String,
      metadata: '',
    })
    setValue('models', updatedModels)
  }

  const removeField = (modelIndex: number, fieldIndex: number) => {
    const updatedModels = [...models]
    updatedModels[modelIndex].fields.splice(fieldIndex, 1)
    setValue('models', updatedModels)
  }

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    if (data.models.length > 0) {
      const model = data.models[0]
      const prismaModel: PrismaModel = {
        id: model.id,
        name: model.name,
        fields: model.fields.map((field: Field) => ({
          name: field.name,
          type: field.type,
          metadata: field.metadata,
        })),
      }

      addPrismaModel(prismaModel)
      localStorage.setItem('idCounter', idCounter.toString())

      reset()
    }
  }

  return (
    <div className="form-container">
      {isAddingModel && (
        <button className="button" type="button" onClick={addModel}>
          Add Model
        </button>
      )}
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {models.map((model, modelIndex) => (
          <div key={modelIndex} className="model-container">
            <label style={{ color: '#1a202c', padding: '10px' }}>
              Model Name:
              <input
                {...register(`models.${modelIndex}.name` as const)}
                type="text"
                placeholder={`Model ${modelIndex + 1}`}
              />
            </label>
            <button
              style={{
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '5px',
              }}
              className="button"
              type="button"
              onClick={() => addField(modelIndex)}
            >
              ADD FIELD
            </button>
            {model.fields.map((field, fieldIndex) => (
              <div
                key={fieldIndex}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div className="field-container">
                  <label style={{ color: '#1a202c' }}>
                    Field Name:
                    <input
                      {...register(
                        `models.${modelIndex}.fields.${fieldIndex}.name` as const,
                      )}
                      type="text"
                      placeholder={`Field ${fieldIndex + 1}`}
                    />
                  </label>
                  <label style={{ color: '#1a202c', padding: '10px' }}>
                    Field Type:
                    <select
                      {...register(
                        `models.${modelIndex}.fields.${fieldIndex}.type` as const,
                      )}
                      defaultValue={FieldType.String}
                    >
                      {Object.values(FieldType).map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    style={{ padding: '5px', margin: '10px' }}
                    className="button"
                    type="button"
                    onClick={() => removeField(modelIndex, fieldIndex)}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            ))}
            {models.length && (
              <button
                style={{
                  flex: '1',
                  justifyContent: 'center',
                  display: 'flex',
                  alignSelf: 'center',
                }}
                className="button"
                type="submit"
              >
                SUBMIT
              </button>
            )}
          </div>
        ))}
      </form>
    </div>
  )
}
export default Form
