import { withRouter } from "next/router";
import { Menu, Layout, Drawer, Divider, Row, Avatar, Popconfirm } from "antd";
import {
  // Grid,
  Image,
  Layers,
  LogOut,
  ShoppingBag,
  Triangle,
} from "react-feather";
import Inner from "components/styles/Sidebar";
import DashHeader from "./styles/Header";
import Link from "next/link";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setMobileDrawer } from "redux/optionsSlice";
import { activeMenuItem } from "helpers/helperFunction";

const { Sider, Header } = Layout;

const SidebarMenu = ({ router }) => {
  const dispatch = useDispatch();
  const activeNavItem = activeMenuItem(router.pathname);

  // state
  const {
    mobile: { isMobileDevice, isMobileDrawer },
    activeMenu,
  } = useSelector((state) => state.options);

  const menuItems = [
    {
      key: "/",
      icon: <Layers size={20} strokeWidth={1} />,
      label: "Dashbord",
      onClick: () => router.push("/"),
    },
    {
      key: "products",
      icon: <ShoppingBag size={20} strokeWidth={1} />,
      label: "Products",
      children: [
        {
          key: "all-products",
          label: "All products",
          onClick: () => router.push("/products"),
        },
        {
          key: "add-product",
          label: "Add product",
          onClick: () => router.push("/products/add-product"),
        },
        {
          key: "products-types",
          label: "Types",
          children: [
            {
              key: "all-products-types",
              label: "All types",
              onClick: () => router.push("/products/types"),
            },
            {
              key: "add-products-types",
              label: "Add type",
              onClick: () => router.push("/products/types/add-type"),
            },
          ],
        },
      ],
    },
    {
      key: "images",
      icon: <Image size={20} strokeWidth={1} />, //eslint-disable-line
      label: "Images",
      children: [
        {
          key: "all-images",
          label: "All images",
          onClick: () => router.push("/images"),
        },
        {
          key: "add-image",
          label: "Add image",
          onClick: () => router.push("/images/add-image"),
        },
      ],
    },
  ];

  console.log(activeNavItem);
  const menu = (
    <>
      <Menu
        mode="inline"
        className="border-0 scroll-y"
        style={{ flex: 1, height: "100%", fontSize: "14px" }}
        items={menuItems}
        defaultOpenKeys={activeNavItem.defaultOpenKeys}
        selectedKeys={activeNavItem.defaultSelectedKeys}
      />

      <Divider />
      <div className={`py-3 px-4 bg-light`}>
        <Row type="flex" align="middle" justify="space-between">
          <Avatar src="/images/avatar.jpg" />
          <Popconfirm
            placement="top"
            title="Are you sure you want to sign out?"
            onConfirm={() => console.log("confirmed")}
            okText="Yes"
            cancelText="Cancel"
          >
            <a className={`px-3 text-body`}>
              <LogOut size={20} strokeWidth={1} />
            </a>
          </Popconfirm>
        </Row>
      </div>
    </>
  );
  return (
    <Inner>
      {!isMobileDevice && (
        <Sider
          width={240}
          className={`bg-light`}
          theme={"light"}
          collapsed={false}
        >
          {menu}
        </Sider>
      )}

      <Drawer
        closable={false}
        width={240}
        placement="left"
        onClose={() => dispatch(setMobileDrawer(false))}
        visible={isMobileDrawer}
        className="chat-drawer"
      >
        <Inner>
          <div
            css={`
              overflow: hidden;
              flex: 1 1 auto;
              flex-direction: column;
              display: flex;
              height: 100vh;
            `}
          >
            <DashHeader>
              <Header>
                <Link href="/">
                  <a className="brand">
                    <Triangle size={24} strokeWidth={1} />
                    <strong
                      className="mx-1"
                      css={`
                        display: inline;
                      `}
                    >
                      Nadrat Ounak
                    </strong>
                  </a>
                </Link>
              </Header>
            </DashHeader>
            {menu}
          </div>
        </Inner>
      </Drawer>
    </Inner>
  );
};

export default withRouter(SidebarMenu);
