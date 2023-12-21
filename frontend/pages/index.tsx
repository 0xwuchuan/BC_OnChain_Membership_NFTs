import type { NextPageWithLayout } from "./_app";
import type { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/layout";

const Home: NextPageWithLayout = () => {
  return (
    <div className="grid min-h-screen grid-cols-2 px-6 text-black bg-white lg:px-20">
      {/*  */}
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
