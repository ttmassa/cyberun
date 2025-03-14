import React, { useState } from 'react'
import { JsonForms } from '@jsonforms/react'
import { Drawer, Menu, Layout, Button } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { schema1, uischema1, data1, schema2, uischema2, data2 } from './data'
import CustomCategorizationRenderer from './components/CustomCategorizationRenderer'
import customCategorizationTester from './components/CustomCategorizationRendererTester'

const { Content } = Layout

const categorizationConfig = {
    set1: {
        title: 'Set 1',
        categories: [
        { key: 'personalInformation', label: 'Informations Personnelles' },
        { key: 'address', label: 'Adresse' },
        { key: 'employment', label: 'Emploi' },
        ]
    },
    set2: {
        title: 'Set 2',
        categories: [
        { key: 'education', label: 'Éducation' },
        { key: 'skills', label: 'Compétences' },
        ]
    }
}

export default function App() {
    const [activeCategory, setActiveCategory] = useState({ set: 'set1', key: 'personalInformation' })
    const [isVisible, setIsVisible] = useState(true)

    const menuItems = Object.entries(categorizationConfig).map(([setKey, setConfig]) => ({
        key: setKey,
        label: setConfig.title,
        children: setConfig.categories.map(cat => ({
            key: JSON.stringify({ set: setKey, key: cat.key }),
            label: cat.label,
        }))
    }));

    const onMenuClick = (info: any) => {
        const newActive = JSON.parse(info.key)
        setActiveCategory(newActive)
    }

    let currentSchema, currentUISchema, currentData
    if (activeCategory.set === 'set1') {
        currentSchema = schema1
        currentUISchema = uischema1
        currentData = data1
    } else {
        currentSchema = schema2
        currentUISchema = uischema2
        currentData = data2
    }

    const uischemaWithOption = {
        ...currentUISchema,
        options: { activeCategory: activeCategory.key }
    }

    return (
        <Layout style={{ height: '100vh' }}>
            <div style={{ position: 'relative', height: '64px', background: '#f0f2f5', padding: '0 16px', display: 'flex', alignItems: 'center' }}>
                <Button
                    icon={<MenuOutlined />}
                    onClick={() => setIsVisible(true)}
                    style={{ zIndex: 1000 }}
                />
            <h1 style={{ marginLeft: '16px', marginBottom: 0 }}>Form Title</h1>
            </div>
            <Drawer
                placement="left"
                open={isVisible}
                closable={true}
                onClose={() => setIsVisible(false)}
                width={256}
            >
                <Menu
                    mode="inline"
                    defaultOpenKeys={['set1', 'set2']}
                    onClick={onMenuClick}
                    items={menuItems}
                />
            </Drawer>
            <Content style={{ marginLeft: isVisible ? 256 : 0, padding: '24px', transition: 'margin-left 0.3s' }}>
                <JsonForms
                    schema={currentSchema}
                    uischema={uischemaWithOption}
                    data={currentData}
                    renderers={[
                    {
                        tester: customCategorizationTester,
                        renderer: CustomCategorizationRenderer
                    }
                    ]}
                />
            </Content>
        </Layout>
    )
}