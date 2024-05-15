import { S3,CreateBucketCommand } from "@aws-sdk/client-s3";

const s3 = new S3({
    region: 'ap-northeast-1',
    endpoint: process.env.REACT_APP_MINIO_URL,
    credentials: {
        accessKeyId: process.env.REACT_APP_MINIO_ACCESS_KEY,
        secretAccessKey:process.env.REACT_APP_MINIO_SECRET_KEY,
    },
    forcePathStyle: true, // MinIO利用時には必要そう。
})

export function splitLastDot(filename) {
    // ドットで分割して配列にし、最後の要素を拡張子として取り出す
    const parts = filename.split('.');
    const extension = parts.length > 1 ? parts.pop() : '';
    // 残りの部分をファイル名として結合する
    const name = parts.join('.');
    return [name, extension];
}


export async function uploadFile (file,filename,bucketname) {
    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: bucketname,
        Key: filename
      };    
      await s3.putObject(params)
}

export async function formsend(url,method,body){
    const requestOption = {
        method : method,
        mode: "cors",  // クロスオリジンリクエストであることを指定
        headers:{'Content-Type': 'application/json'},
        body: body
    }
    const response = await fetch(url,requestOption);
    const data = await response.json();
    if(!response.ok){
        console.error("Received data:", data)
        return null;
    }
    return data

}