import Error from "next/error";
import Layout from "../components/layout";
import { NextPageWithLayout } from "./_app";

const Custom404: NextPageWithLayout = () => {
	return <Error statusCode={404} />;
};

Custom404.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default Custom404;
