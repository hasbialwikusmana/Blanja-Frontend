import { useEffect, useRef, useState } from "react";
import moment from "moment";
import profile from "../../assets/img/profile/1.png";
import api from "../../services/Api";
import Swal from "sweetalert2";

function ProfileCard() {
  const [image, setImage] = useState(null);
  const [photo, setPhoto] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    date_of_birth: "",
    photo: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const costumerResponse = await api.get("/customers/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const existingData = costumerResponse.data?.data || {};

        setFormData({
          name: existingData.name || "",
          email: existingData.email || "",
          phone: existingData.phone || "",
          gender: existingData.gender || "",
          date_of_birth: existingData.date_of_birth ? moment(existingData.date_of_birth).local().format("YYYY-MM-DD") : "",
          photo: existingData.photo || "",
        });
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 403) {
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "You do not have permission to view this profile.",
          }).then(() => {
            localStorage.clear();
            window.location.href = "/";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while fetching the profile.",
          });
        }
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const selectedPhoto = e.target.files[0];
    if (selectedPhoto) {
      setPhoto(selectedPhoto);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedPhoto);
    }
  };

  const handleSelectImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();

    try {
      if (photo) {
        const formDataToSend = new FormData();
        formDataToSend.append("photo", photo);

        const token = localStorage.getItem("token");
        const response = await api.put("/customers/profile/update-image", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Profile photo updated successfully",
        });

        setFormData({
          ...formData,
          photo: response.data?.data?.photo || formData.photo,
        });
      } else {
        const response = await api.put("/customers/profile", formData);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Profile updated successfully",
        });

        setFormData(response.data?.data || formData);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: photo ? "Failed to update profile photo" : "Failed to update profile",
      });
    }
  };

  return (
    <div className="w-3/4 p-8 mt-16">
      <div className="bg-white rounded-md border shadow-md p-6 mb-8 lg:min-h-screen">
        <h2 className="text-lg font-semibold mb-4">My Profile</h2>
        <p className="text-sm text-gray-600 mb-4">Manage your profile information</p>
        <hr className="mb-4" />
        <form onSubmit={handleSubmitProfile}>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-2/3 px-4">
              <div className="p-6">
                <div className="mb-4">
                  <label className="text-[#9B9B9B] mr-2">Name</label>
                  <input type="text" name="name" className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-primary" value={formData.name} onChange={handleInputChange} />
                </div>

                <div className="mb-4">
                  <label className="text-[#9B9B9B] mr-2">Email</label>
                  <input type="text" name="email" className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-primary" value={formData.email} onChange={handleInputChange} />
                </div>

                <div className="mb-4">
                  <label className="text-[#9B9B9B] mr-2">Phone number</label>
                  <input type="text" name="phone" className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-primary" value={formData.phone} onChange={handleInputChange} />
                </div>

                <div className="mb-4">
                  <label className="text-[#9B9B9B] mr-2">Gender</label>
                  <div className="flex items-center">
                    <input type="radio" id="Laki-laki" name="gender" value="Laki-laki" checked={formData.gender === "Laki-laki"} onChange={handleInputChange} className="mr-2" />
                    <label htmlFor="male" className="mr-4">
                      Laki-laki
                    </label>
                    <input type="radio" id="Perempuan" name="gender" value="Perempuan" checked={formData.gender === "Perempuan"} onChange={handleInputChange} className="mr-2" />
                    <label htmlFor="female">Perempuan</label>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-[#9B9B9B] mr-2">Date of birth</label>
                  <input type="date" name="date_of_birth" className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-primary" value={formData.date_of_birth} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/3 mb-4 flex justify-center">
              <div className="p-6 rounded-md flex flex-col items-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4">
                  <img src={image || formData.photo || profile} alt="Profile" className="object-cover w-full h-full" />
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" ref={fileInputRef} onChange={handleImageChange} />
                </div>
                <button type="button" onClick={handleSelectImageClick} className="bg-white text-[#9B9B9B] border border-[#9B9B9B] px-4 py-2 rounded-full focus:outline-none hover:bg-hoverPrimary hover:text-white">
                  Select image
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-start ml-4 lg:ml-10 mb-4">
            <button type="submit" className="bg-primary text-white px-10 py-2 rounded-full focus:outline-none hover:bg-hoverPrimary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileCard;
