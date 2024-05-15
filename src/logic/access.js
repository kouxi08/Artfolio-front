import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
    region: "ap-northeast-1",
    endpoint: process.env.REACT_APP_MINIO_URL,
    credentials: {
        accessKeyId: process.env.REACT_APP_MINIO_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_MINIO_SECRET_KEY,
    },
    forcePathStyle: true, // MinIO利用時には必要そう。
});


// const objects = await s3.listObjectsV2({ Bucket: "images" });
// const contents = objects.Contents;
// if (!contents) {
//   console.log("バケット内が空です。");
// }else{
//     console.log(contents)
// }


export function splitLastDot(filename) {
    // ドットで分割して配列にし、最後の要素を拡張子として取り出す
    const parts = filename.split('.');
    const extension = parts.length > 1 ? parts.pop() : '';
    // 残りの部分をファイル名として結合する
    const name = parts.join('.');
    return [name, extension];
}

export async function uploadFile(file, filename, bucketname) {
    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: bucketname,
        Key: filename
    };    

    try {
        const stream = await s3.putObject(params);
        console.log("File uploaded successfully:", stream);
        return stream;
    } catch (error) {
        console.error("Error uploading file:", error);
        return null;
    }
}

export async function formsend(url, method, body) {
    const requestOption = {
        method: method,
        mode: "cors",  // クロスオリジンリクエストであることを指定
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body) // bodyをJSON文字列に変換
    };

    try {
        const response = await fetch(url, requestOption);
        const data = await response.json();

        if (!response.ok) {
            console.error("Error in formsend response:", data);
            return null;
        }

        return data;
    } catch (error) {
        console.error("Error in formsend request:", error);
        return null;
    }
}
