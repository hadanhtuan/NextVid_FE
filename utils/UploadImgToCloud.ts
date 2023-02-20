export default async function uploadImg(img: string) {
  const data = new FormData();
    data.append('file', img);
    data.append('upload_preset', 'nft_charity')
      const res = await fetch("https://api.cloudinary.com/v1_1/dhshtvtrl/video/upload", {
        method:"POST",
        body:data
      })

    const file = await res.json();
    console.log(file)
    return file.url
} 