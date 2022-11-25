import axios from "axios";

export const uploadPhoto = async (image) => {
  const imageNotSelected = !image.raw && !image.preview;

  const { raw, preview } = image;

  if (imageNotSelected) return { error: false, data: "" };

  if (typeof raw === "string") return { error: false, data: preview };

  try {
    const formData = new FormData();
    formData.append("photo_url", image.raw);
    const res = await axios.post("/file", formData);
    return { error: false, data: res.data.data };
  } catch (err) {
    console.log(err);
    return { error: true, data: "" };
  }
};
