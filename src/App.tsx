import React from 'react'
import { JsonForms } from '@jsonforms/react'
import { schema1, uischema1, data1 } from './data/index.ts'

export default function App() {
    return (
        <React.StrictMode>
            <div>
                <JsonForms 
                    schema={schema1}
                    uischema={uischema1}
                    data={data1}
                    renderers={[
                        
                    ]}
                />
            </div>
        </React.StrictMode>
    )
}