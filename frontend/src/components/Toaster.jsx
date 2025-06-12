import { Toaster as ToastMaker } from "react-hot-toast";

const Toaster = () => {
  return (
    <ToastMaker
      toastOptions={{
        style: {
          fontSize: "14px",
        },
        success: {
          iconTheme: {
            primary: "#1368EC",
          },
        },
      }}
    />
  );
};

export default Toaster;
