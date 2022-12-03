import type { NextPageWithLayout } from "./_app";
import type { ReactElement } from "react";

import Layout from "../components/layout";

const Home: NextPageWithLayout = () => {
	return <> </>;
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Home;
