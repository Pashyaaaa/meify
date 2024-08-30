/* eslint-disable react/prop-types */
import Button from "../Button";

const ShareButton = ({ classname }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Meify Wrapped Story",
          text: "Cek pengalaman mendengarkan musik saya di Meify!",
          url: window.location.href,
        });
        console.log("Berhasil dibagikan!");
      } catch (error) {
        console.error("Gagal membagikan", error);
      }
    } else {
      alert("Web Share API tidak didukung di browser ini.");
    }
  };

  return (
    <Button
      onClick={handleShare}
      classname={`${classname} bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}
    >
      Share
    </Button>
  );
};

export default ShareButton;
