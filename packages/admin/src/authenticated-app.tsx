import React, { useState } from 'react'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, theme } from 'antd'
import { useNavigate } from 'react-router-dom'
import HeaderComponent from '@/components/header'
import SiderComponent from '@/components/sider'

const { Content, Footer } = Layout

const AuthenticatedApp: React.FC = () => {
  const [currentKey, setCurrentKey] = useState('sub1')
  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const onMenuClick: MenuProps['onClick'] = (e) => {
    setCurrentKey(e.key)
  }
  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <HeaderComponent />
      <div style={{ flex: 1, padding: '0 48px', display: 'flex', flexDirection: 'column' }}>
        <Breadcrumb
          style={{ margin: '16px 0' }}
          items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
        />
        <Layout
          style={{
            flex: 1,
            padding: '24px 0',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            display: 'flex',
          }}
        >
          <SiderComponent
            currentKey={currentKey}
            onMenuClick={onMenuClick}
            colorBgContainer={colorBgContainer}
          />
          <Content style={{ padding: '0 24px', maxHeight: 684, overflow: 'auto' }}></Content>
        </Layout>
      </div>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  )
}

export default AuthenticatedApp
