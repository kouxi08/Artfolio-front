// import React, { useEffect,useState } from 'react'
// import { formsend, getFiles } from './logic/access';
// import {style} from './Portfolio.css'

// export default function Portfolio() {
//     const [images, setImages] = useState([]);
//     const [contents, setContents] = useState([]);
//     const [imageUrl , setImageUrl] = useState();

//     useEffect(() => {
//         const getImages = async () => {
//             const bucketName = 'arp';  // バケット名
//             const { Contents, IsTruncated, NextContinuationToken } = await getFiles(bucketName);
//             const portfolioImages = []
//             Contents.map(file => {
//                 console.log(file["Key"].split('-')[0])
//                 if(file["Key"].split('-')[0] == 'profile') {
//                     setImageUrl(`${process.env.REACT_APP_MINIO_URL}/${bucketName}/${file["Key"]}`)
//                 }else {
//                     portfolioImages.push(`${process.env.REACT_APP_MINIO_URL}/${bucketName}/${file["Key"]}`)
//                 }
//             });
//             console.log(portfolioImages)
//             setImages(portfolioImages);  
//             setContents(Contents);  
//         };
//         getImages();
//     }, []);


//     return (
//         <>
//             <div className='flex'>
//                 <img className='port-img' src={imageUrl} alt="説明文" />
//                 <div className='port'>
//                     <p>SCHOOL:ECCアーティスト美容専門学校</p>
//                     <p>NAME:ユーザー名</p>
//                     <p>EMAIL:ECCArtist@ecc.ac.jp</p>
//                     <p>TEL:000-1234-5678</p>
//                 </div>
//             </div>
//             <ul class="columns-2 md-columns-3 lg-columns-4 xl-columns-5 sm-mr-4 sm-ml-4 img">
//                 {images.map(url => {
//                     return (
//                     <>
//                         <li>
//                             <img src={url} alt="説明文" />
//                         </li>
//                     </>
//                 )})}
//             </ul>
//             {/* <style jsx>{`
//                 .flex{
//                     display: flex;
//                 }
//                 .port-img {
//                     width: 100px;
//                     height: 100px;
//                     object-fit: cover;
//                 }
//                 .port{
//                     margin-left: 100px;
//                 }
                
//             `}</style> */}
//             <style jsx>{`
//             /* sm:mr-4 */
//             @media (min-width: 640px) {
//               .sm\:mr-4 {
//                 margin-right: 1rem; 
//               }
//             }
            
//             /* sm:ml-4 */
//             @media (min-width: 640px) {
//               .sm\:ml-4 {
//                 margin-left: 1rem; 
//               }
//             }
            
//             /* columns-2 */
//             .columns-2 {
//               column-count: 2;
//             }
            
//             /* md:columns-3 */
//             @media (min-width: 768px) {
//               .md\:columns-3 {
//                 column-count: 3;
//               }
//             }
            
//             /* lg:columns-4 */
//             @media (min-width: 1024px) {
//               .lg\:columns-4 {
//                 column-count: 4;
//               }
//             }
            
//             /* xl:columns-5 */
//             @media (min-width: 1280px) {
//               .xl\:columns-5 {
//                 column-count: 5;
//               }
//             }
//             img {
//                 margin-bottom: 1rem;
//             }
//             #loading {
//                 width: 100vw;
//                 height: 100vh;
//                 transition: all 1s;
//                 background-color: rgb(255, 255, 255);
        
//                 position: fixed;
//                 z-index: 9999;
//             }
//             .spinner {
//                 width: 100px;
//                 height: 100px;
//                 margin: 200px auto;
//                 background-color: #9e9d9d;
//                 border-radius: 100%;
//                 animation: sk-scaleout 1.0s infinite ease-in-out;
//             }
//             /* ローディングアニメーション */
//             @keyframes sk-scaleout {
//                 0% {
//                     transform: scale(0);
//                 } 100% {
//                     transform: scale(1.0);
//                     opacity: 0;
//                 }
//             }
//             .loaded {
//                 opacity: 0;
//                 visibility: hidden;
//             }
//             #imageContainer{
//                 animation: fadeIn 2s ease 0s 1 normal;
//                 -webkit-animation: fadeIn 2s ease 0s 1 normal;
//             }
//                 @keyframes fadeIn {
//                 0% {opacity: 0}
//                 100% {opacity: 1}
//             }
//             `}</style>
//         </>
//     )
// }

import React, { useEffect, useState } from 'react';
import { formsend, getFiles } from './logic/access';
import './Portfolio.css';

export default function Portfolio() {
    const [images, setImages] = useState([]);
    const [contents, setContents] = useState([]);
    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
        const getImages = async () => {
            const bucketName = 'arp';  // バケット名
            const { Contents, IsTruncated, NextContinuationToken } = await getFiles(bucketName);
            const portfolioImages = []
            Contents.map(file => {
                console.log(file["Key"].split('-')[0])
                if (file["Key"].split('-')[0] === 'profile') {
                    setImageUrl(`${process.env.REACT_APP_MINIO_URL}/${bucketName}/${file["Key"]}`)
                } else {
                    portfolioImages.push(`${process.env.REACT_APP_MINIO_URL}/${bucketName}/${file["Key"]}`)
                }
            });
            console.log(portfolioImages)
            setImages(portfolioImages);
            setContents(Contents);
        };
        getImages();
    }, []);

    return (
        <>
            <div className='flex'>
                <img className='port-img' src={imageUrl} alt="プロフィール画像" />
                <div className='port'>
                    <p>SCHOOL: ECCアーティスト美容専門学校</p>
                    <p>NAME: ユーザー名</p>
                    <p>EMAIL: ECCArtist@ecc.ac.jp</p>
                    <p>TEL: 000-1234-5678</p>
                </div>
            </div>
            <ul className="columns-2 md-columns-3 lg-columns-4 xl-columns-5 sm-mr-4 sm-ml-4 img">
                {images.map(url => (
                    <li key={url}>
                        <img src={url} alt="作品画像" />
                    </li>
                ))}
            </ul>
        </>
    )
}
