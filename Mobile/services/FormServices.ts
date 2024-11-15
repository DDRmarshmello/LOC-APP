import axios from "axios";

export async function uploadPhotos(photos: string[], data: string) {
  const formData = new FormData();

  formData.append("Event", data)
  // Agrega cada imagen al FormData
  photos.forEach((photoUri, index) => {
    const photoName = `photo_${index + 1}.jpg`;
    formData.append("images", {
      uri: photoUri,
      type: "image/jpeg",
      name: photoName,
    } as any); // El tipo `any` es necesario para evitar problemas de tipo en TS y RN.
  });

  try {
    const response = await axios.post("http://10.0.0.5:7059/api/Event/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return true;
  } catch (error) {
    console.error("Error al subir las fotos:", error);
  }
}
