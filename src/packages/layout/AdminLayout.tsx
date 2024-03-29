import Head from "next/head";
import { Children } from "../common/types";
import Navbar from "../navbar";

const AdminLayout = ({ children }: {} & Children) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex-grow">{children}</main>
    </>
  );
};

export default AdminLayout;
