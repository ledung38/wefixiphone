import LayoutComponents from "@/components/layouts/LayoutComponents";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return <LayoutComponents>{children}</LayoutComponents>;
};

export default Layout;
