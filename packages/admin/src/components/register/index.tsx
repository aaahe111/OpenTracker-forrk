import { useState, useEffect } from 'react'
import { authAPI } from '@/api/auth'

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  // 提示自动消失（3秒）
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMsg('')
      setErrorMsg('')
    }, 3000)
    return () => clearTimeout(timer) // 组件卸载时清除定时器，避免内存泄漏
  }, [successMsg, errorMsg])

  // 清除提示（手动触发）
  const clearMsg = () => {
    setSuccessMsg('')
    setErrorMsg('')
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    clearMsg() // 点击注册先清空之前的提示

    // 表单校验（无 alert，用 errorMsg 显示）
    if (!form.username.trim()) {
      setErrorMsg('用户名不能为空')
      return
    }
    if (!form.password.trim()) {
      setErrorMsg('密码不能为空')
      return
    }
    if (form.password.length < 6) {
      setErrorMsg('密码长度不能少于6位')
      return
    }

    setLoading(true)
    try {
      const response = await authAPI.register(form.username, form.password)

      if (response.code === 200) {
        // 注册成功
        setSuccessMsg('注册成功！即将跳转到登录页面')
        // 重置表单
        setForm({ username: '', password: '' })
        // 2秒后跳转到登录页面
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      } else {
        // 注册失败
        setErrorMsg(response.message || '注册失败')
      }
    } catch (err) {
      // 网络错误或服务器错误
      setErrorMsg('注册失败，请检查网络连接或稍后重试')
      console.error('注册失败：', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        maxWidth: '350px',
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #eee',
        borderRadius: '8px',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>用户注册</h2>

      {/* 表单 */}
      <form
        onSubmit={handleRegister}
        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
      >
        {/* 用户名输入框 */}
        <div>
          <input
            type="text"
            value={form.username}
            onChange={(e) => {
              setForm({ ...form, username: e.target.value })
              clearMsg() // 输入时清空提示
            }}
            placeholder="请输入用户名"
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '16px',
            }}
          />
        </div>

        {/* 密码输入框 */}
        <div>
          <input
            type="password"
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value })
              clearMsg() // 输入时清空提示
            }}
            placeholder="请输入密码（不少于6位）"
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '16px',
            }}
          />
        </div>

        {/* 注册按钮 */}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#28a745',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            opacity: loading ? 0.8 : 1,
          }}
        >
          {loading ? '注册中...' : '立即注册'}
        </button>
      </form>

      {/* 成功提示（绿色，顶部显示） */}
      {successMsg && (
        <div
          style={{
            marginTop: '15px',
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: '#d4edda',
            color: '#155724',
            fontSize: '14px',
            textAlign: 'center',
            border: '1px solid #c3e6cb',
          }}
        >
          {successMsg}
        </div>
      )}

      {/* 错误提示（红色，顶部显示） */}
      {errorMsg && (
        <div
          style={{
            marginTop: '15px',
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            fontSize: '14px',
            textAlign: 'center',
            border: '1px solid #f5c6cb',
          }}
        >
          {errorMsg}
        </div>
      )}
    </div>
  )
}

export default Register
