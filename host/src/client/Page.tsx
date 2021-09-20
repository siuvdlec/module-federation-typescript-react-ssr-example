import * as React from "react";
import loadable from "@loadable/component";

// @ts-ignore
const RemoteHeader = loadable(() => import("guests/Header"));

const Page: React.FC<{}> = () => (
  <>
    <RemoteHeader />
    <span>I am lazy page</span>
  </>
);

export default Page;
