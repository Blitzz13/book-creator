import React, { useRef, useState } from 'react';
import storage from "../../firestore"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import styled from 'styled-components';
import { Colors } from '../../Colors';
import ProgressBar from '../ProgressBar/ProgressBar';
import { IImageUploaderData } from '../../interfaces/IImageUploaderData';

export default function ImageUploader({data, ...delegated}: IImageUploaderData) {
    const imageRef = useRef<HTMLInputElement | null>(null);
    const [percent, setPercent] = useState<number>();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImage = e.target.files?.[0];
        if (selectedImage) {
            handleUpload(selectedImage);
        };
    };

    function handleUpload(image: File | null) {
        if (!image) {
            console.warn("Please choose a file first!");
            return;
        }

        const storageRef = ref(storage, `/images/${image?.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                setPercent(percent);
                data.setPercentage(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                    data.setImageUrl(url);
                    setPercent(101);
                });
            }
        );
    }

    return (
        <Wrapper>
            <Input {...delegated} ref={imageRef} title="Choose Image" type="file" accept="image/*" onChange={handleImageChange} />
            {(percent !== undefined && percent > 0 && percent < 101) &&
                <ProgressBar width={imageRef.current?.clientWidth || 0} height={4} percentage={percent || 0} dontShowText={true} />
            }
        </Wrapper>
    );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  /* margin: 10px 0; */
  width: 100%;
  color: ${Colors.TEXT};
  background: ${Colors.ACCENT};
  border: 1px solid ${Colors.BORDER};
  border-radius: 22px;
  /* padding: 5px 8px; */
  padding-left: 4px;
  outline: none;
  white-space: nowrap;
  font-size: ${17.8 / 16}rem;
  &::-webkit-file-upload-button{
    visibility: hidden;
    display: none;
  }
`;
