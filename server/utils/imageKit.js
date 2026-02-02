import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_SECRET,
});

export default imagekit;
