'use client';

import config from "@/lib/config";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

const {env: {imagekit: {publicKey, urlEndpoint}}} = config;

const authenticator = async()=> {
    try {
        const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

        if(!response.ok) {
            const errorText = await response.text();

            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log("Auth response:", data); // <-- ADD THIS

        const {signature, token, expire} = data;

        return {token, signature, expire};
   } catch (error: any) {
        throw new Error("Error in authenticator: " + error.message);        
    }
}

const ImageUpload = ({onFileChange}: {onFileChange: (filePath: string) => void}) => {

    const ikUploadRef = useRef(null);
    const [file, setFile] = useState<{filePath: string } | null>(null);

    const onError = (error: any)=> {
        setFile(null);
        console.error("Error uploading file" + error.message);
        toast.error("Error uploading file: " + error.message);
    }

    const onSuccess = (res: any)=> {
        setFile(res);
        onFileChange(res.filePath);
        toast.success("File uploaded successfully");
    }

  return (
    <ImageKitProvider 
        publicKey={publicKey} 
        urlEndpoint={urlEndpoint} 
        authenticator={authenticator}
    >
        <IKUpload
            className="hidden"
            ref={ikUploadRef}
            onError={onError}
            onSuccess={onSuccess}
            fileName="test-upload.jpg"
        />

        <button className="upload-btn" onClick={(e) => {
            e.preventDefault();
            if(ikUploadRef.current){
                //@ts-ignore
                ikUploadRef.current?.click();
            }
        }}>
            <Image 
                src="/icons/upload.svg" 
                alt="upload" 
                width={20} 
                height={20} 
                className="object-contain"
            />
            <p className="text-base text-light-100">Upload a file</p>
            {file && <p className="upload-filename">{file.filePath}</p>}
        </button>
        {file && (
            <IKImage 
                alt={file.filePath}
                path={file.filePath}
                width={500}
                height={300}
            />
        )

        }
    </ImageKitProvider>
  )
}

export default ImageUpload
