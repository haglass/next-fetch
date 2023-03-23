import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import HeaderInfo from "../../components/HeaderInfo";
import photosListStyle from "../../styles/PhotosList.module.css";
const List = ({ cats }) => {
  const router = useRouter();
  const { id } = router.query; // {id: 'aege'}
  //   console.log(cats);
  return (
    <>
      <div className={photosListStyle.photos}>
        <HeaderInfo title="Cats World - Search" />
        <h1>
          Cats Photo List : {id}
          <Link href="/photos">
            <a> Go Back</a>
          </Link>
        </h1>
        <ul>
          {cats.map((cat) => (
            <li key={cat.id}>
              <Image
                src={cat.url}
                width={100}
                height={100}
                alt={cat.breeds[0].name}
              />
              <div className={photosListStyle.info}>
                <a href={cat.breeds[0].cfa_url} target="_blank">
                  Cafe Link
                </a>
                <h3>Cat Description</h3>
                <p>{cat.breeds[0].description}</p>
              </div>
              {/* <span>{cat.breeds[0].name}</span> */}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
// SSG 외부 데이터 연동
export const getStaticProps = async (context) => {
  // getStaticPaths 로 전송된 paths 배열을 활용하는 경우에는
  // context.params 를 활용한다.
  const { id } = context.params; //{ id: 'abob' }
  console.log(context.params);

  const res = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${id}&api_key=${process.env.NEXT_PUBLIC_CATS_KEY}`
  );
  const cats = await res.json();
  return {
    props: {
      cats,
    },
    revalidate: 20,
  };
};

// [id].js 에 SSG 를 적용하는 경우
// getStaticPaths 를 작성해야 합니다.
// 예를 들어 : /photos/id 를 전송 시
// getStaticPahts 가 실행 된다.
// params 를 통해서 전달된 id를
// { params : { id : 문자열값} } 을
// 모은 배열 (paths) 에 담아서 context 로 전송한다.
// 이렇게 전송된 context 는 getStaticProps 에서 활용한다.

export const getStaticPaths = async () => {
  // 기본 전체 목록을 가지고 온다.
  // getStaticProps 에 전달할 paths 배열을 만들기 위해서
  const res = await fetch(
    `https://api.thecatapi.com/v1/breeds?api_key=${process.env.NEXT_PUBLIC_CATS_KEY}&limit=10`
  );
  const cats = await res.json();
  //   console.log(cats);
  const paths = cats.map(({ id }) => ({ params: { id: `${id}` } }));

  return {
    // paths: [{ params: { id: "abob" } }],
    paths,
    fallback: false,
  };
};

export default List;
