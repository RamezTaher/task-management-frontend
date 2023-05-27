import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 72,
    }}
    spin
  />
)
const Loader = () => <Spin className="z-10" indicator={antIcon} />
export default Loader
