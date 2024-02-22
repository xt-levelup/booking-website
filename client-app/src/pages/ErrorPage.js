import { Helmet } from "react-helmet";

const ErrorPage = () => {
    return (
        <div>
            <Helmet>
                <title>Booking Error Page</title>
            </Helmet>
            <p style={{ textAlign: "center", marginTop: "3em" }}>
                Something went wrong!
            </p>
        </div>
    );
};

export default ErrorPage;
