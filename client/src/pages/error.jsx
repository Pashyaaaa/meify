import Hyperlink from "../components/Hyperlink";
const ErrorPage = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen bg-black">
      <p className="text-5xl font-bold text-white">404</p>
      <p className="font-semibold text-white leading-10">
        THE PAGE YOU REQUESTED WAS NOT FOUND
      </p>
      <div className="navigate flex gap-12">
        <Hyperlink to="/" classname="bg-green-500 p-4">
          Go To Home
        </Hyperlink>
        <Hyperlink
          to="https://gmail.com"
          classname="bg-slate-600 text-green-500 p-4"
        >
          Contact Us
        </Hyperlink>
      </div>
    </div>
  );
};

export default ErrorPage;
