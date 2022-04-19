import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import HomePage from "./views/Home";
import RandomLunchPage from "./views/RandomLunch";
import { useState } from "react";
import TodoPage from "./views/Todo";

const { Sider } = Layout;
const App = function () {
  const [collapsed, setCollapsed] = useState(false);

  function NavLink() {
    const location = useLocation();
    return (
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className='logo' />
        <Menu
          theme='dark'
          defaultSelectedKeys={[location.pathname]}
          mode='inline'
        >
          <Menu.Item key='/' icon={<PieChartOutlined />}>
            <Link to={"/"}>首页</Link>
          </Menu.Item>
          <Menu.Item key='/todo' icon={<DesktopOutlined />}>
            <Link to={"/todo"}>Todo</Link>
          </Menu.Item>
          <Menu.Item key='/random-lunch' icon={<DesktopOutlined />}>
            <Link to={"/random-lunch"}>摇号吃饭</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <NavLink />
        <Layout style={{ background: "#fff" }}>
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/todo' element={<TodoPage />} />
            <Route exact path='/random-lunch' element={<RandomLunchPage />} />
          </Routes>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
