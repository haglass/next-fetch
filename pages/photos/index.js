import Image from "next/image";
import React from "react";
import HeaderInfo from "../../components/HeaderInfo";
import photosStyle from "../../styles/Photos.module.css";
const Photos = ({ cats }) => {
  return (
    <>
      <HeaderInfo title="Cats World - photo" />
      <ul className={photosStyle.photos}>
        {cats.map((cat) => (
          <li key={cat.name}>
            <Image
              src={cat.image.url}
              width={100}
              height={100}
              alt={cat.name}
            />
            <span>{cat.name}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

// SSG 적용
export const getStaticProps = async () => {
  const res = await fetch(
    `https://api.thecatapi.com/v1/breeds?api_key=${process.env.NEXT_PUBLIC_CATS_KEY}&limit=10`
  );
  const cats = await res.json();
  return {
    props: {
      cats,
    },
    revalidate: 20,
  };
};

export default Photos;
