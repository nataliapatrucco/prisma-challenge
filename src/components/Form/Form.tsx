import React from 'react';
import './Form.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AiOutlineDelete } from "react-icons/ai";

interface Field {
    name: string;
    type: string;
  }
  
  interface Model {
    name: string;
    fields: Field[];
  }
  
  interface FormData {
    models: Model[];
  }

  enum FieldType {
    Int = 'Int',
    String = 'String',
    Boolean = 'Boolean',
    DateTime = 'DateTime',
    // Add other table types as needed
  }

  interface FormProps {
    addPrismaModel: (model: PrismaModel) => void;
  }
  
  interface PrismaModel {
    name: string;
    fields: {
      name: string;
      type: string;
    }[];
  }

const Form: React.FC<FormProps> = ({addPrismaModel}) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm<FormData>({
    defaultValues: { models: [] },
  });

  const models: Model[] = watch('models', [] as Model[]);
  const isAddingModel: boolean = models.length === 0;

  const addModel = () => {
    setValue('models', [...models, { name: '', fields: [] }]);
  };

  // const removeModel = (modelIndex: number) => {
  //   const updatedModels = [...models];
  //   updatedModels.splice(modelIndex, 1);
  //   setValue('models', updatedModels);
  // };

  const addField = (modelIndex: number) => {
    const updatedModels = [...models];
    updatedModels[modelIndex].fields.push({ name: '', type: FieldType.String });
    setValue('models', updatedModels);
  };

  const removeField = (modelIndex: number, fieldIndex: number) => {
    const updatedModels = [...models];
    updatedModels[modelIndex].fields.splice(fieldIndex, 1);
    setValue('models', updatedModels);
  };

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    if (data.models.length > 0) {
    const model = data.models[0]
    const prismaModel: PrismaModel = {
      name: model.name,
      fields: model.fields.map((field: Field) => ({
        name: field.name,
        type: field.type,
      })),
    };

    addPrismaModel(prismaModel);

    reset();
  }
  };
    
      return (
        <div className='form-container'>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
              {models.map((model, modelIndex) => (
                <div key={modelIndex} className="model-container">
                  <label style={{color: '#1a202c', padding: '10px'}}>
                    Model Name:
                    <input
                      {...register(`models.${modelIndex}.name` as const)}
                      type="text"
                      placeholder={`Model ${modelIndex + 1}`}
                    />
                  </label>
                  {/* <button className='button' type="button" onClick={() => removeModel(modelIndex)}>
                    Remove Model
                  </button> */}
    
                  {model.fields.map((field, fieldIndex) => (
                    <div key={fieldIndex} className="field-container">
                      <label style={{color: '#1a202c', padding: '10px'}}>
                        Field Name:
                        <input
                          {...register(`models.${modelIndex}.fields.${fieldIndex}.name` as const)}
                          type="text"
                          placeholder={`Field ${fieldIndex + 1}`}
                        />
                      </label>
                      <label style={{color: '#1a202c', padding: '10px'}}>
                        Field Type:
                        <select
                      {...register(`models.${modelIndex}.fields.${fieldIndex}.type` as const)}
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
                        className='button'
                        type="button"
                        onClick={() => removeField(modelIndex, fieldIndex)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  ))}
                  <button
                    className='button'
                    type="button"
                    onClick={() => addField(modelIndex)}
                  >
                    Add Field
                  </button>
                </div>
              ))}
                     <div className='button-container'>
            {isAddingModel && (
            <button className='button' type="button" onClick={addModel}>
              Add Model
            </button>
          )}
              
              </div>   
            </form>
            {models.length > 0 && (
            <button className='button' type="submit">
              Submit
            </button>
          )}
        </div>
      );
    };
export default Form;