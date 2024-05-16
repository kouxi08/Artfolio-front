import React, { useEffect,useState } from 'react'
import { formsend, getFiles } from './logic/access';


export default function Portfolio() {
    const [images, setImages] = useState([]);
    const [contents, setContents] = useState([]);

    useEffect(() => {
        const getImages = async () => {
            const bucketName = 'arp';  // バケット名
            const { Contents, IsTruncated, NextContinuationToken } = await getFiles(bucketName);
            const imageUrls = Contents.map(file => `${process.env.REACT_APP_MINIO_URL}/${bucketName}/${file["Key"]}`);
            setImages(imageUrls);  // 画像のURLを状態にセット
            setContents(Contents);  // 取得したコンテンツを状態にセット
        };

        getImages();
    }, []);

    console.log(images);  // コンソールで画像のURLを確認

    return (
        <>
            

        </>
    )
}
