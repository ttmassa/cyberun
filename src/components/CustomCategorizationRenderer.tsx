import React from 'react'
import { LayoutProps, isCategorization, rankWith } from '@jsonforms/core'
import { withJsonFormsLayoutProps } from '@jsonforms/react'
import { Input } from 'antd'

const CustomCategorizationRenderer = (props: LayoutProps) => {
    const { uischema, visible } = props
    if (!visible) {
        return null
    }
    // Vérifier que l'uischema est de type Categorization
    if (!uischema || !isCategorization(uischema)) {
        return null
    }

    // Récupérer l'option activeCategory passée dans l'uischema
    const activeCategoryKey = uischema.options?.activeCategory
    if (!activeCategoryKey) {
        return <div>Aucune catégorie active définie dans les options.</div>
    }

    // On cherche la catégorie dont le label correspond à la clé active.
    const activeCategory = uischema.elements.find(
        (category: any) => category.options?.key === activeCategoryKey
    )

    if (!activeCategory) {
        return <div>Aucune catégorie trouvée pour : {activeCategoryKey}</div>
    }

  return (
    <div>
        <h2 style={{ marginBottom: '24px' }}>{activeCategory.label}</h2>
        {activeCategory.elements.map((control: any, index: number) => {
            // Pour cet exemple, on extrait le nom de la propriété à partir du scope.
            const segments = control.scope.split('/')
            const propertyName = segments[segments.length - 1]
            return (
                <div key={index} style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>{propertyName}</label>
                    <Input placeholder={propertyName} />
                </div>
            )
        })}
    </div>
  )
}

export const customCategorizationTester = rankWith(10, (uischema) =>
    isCategorization(uischema)
)

CustomCategorizationRenderer.tester = customCategorizationTester

export default withJsonFormsLayoutProps(CustomCategorizationRenderer)
