// upload image into imageBB

export const uploadImage = async image => {

      const formData = new FormData();
      formData.append('image', image)
      const imgURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`
      console.log(imgURL);
      const response = await fetch(imgURL, {
            method: 'POST',
            body: formData,
      })

      const data = await response.json()
      return data;

}