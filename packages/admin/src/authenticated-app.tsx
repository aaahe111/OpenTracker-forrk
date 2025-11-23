import React from 'react'
import { Button, Layout, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { removeToken } from '@/utils/token'

const { Header, Content } = Layout
const { Title } = Typography

const AuthenticatedApp = () => {
  // 导航钩子
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    navigate('/')
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 顶部导航栏 */}
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#fff',
          padding: '0 24px',
        }}
      >
        <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
          主页
        </Title>
        <Button type="default" danger onClick={handleLogout}>
          退出登录
        </Button>
      </Header>

      {/* 主要内容区 */}
      <Content style={{ padding: 24, textAlign: 'center' }}>
        <Title level={1}>主页</Title>
        <p>欢迎使用 OpenTracker 埋点平台</p>
      </Content>
    </Layout>
  )
}

export default AuthenticatedApp
