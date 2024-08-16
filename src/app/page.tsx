import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PermitChain</title>
        <meta
          name="description"
          content="Blockchain-based electronic approval system"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.textform}>
            <h1 className={styles.title}>PermitChain</h1>
            <p className={styles.subtitle}>블록체인 기반 전자 승인서</p>
            <div className="buttons">
              <Link href={'/login'}><button className={styles.loginButton}>로그인</button></Link>
              <Link href={'/about'}><button className={styles.loginButton}>더 알아보기</button></Link>
            </div>
          </div>
          {/* <div className={styles.thumbnail}>
            <Image
              src="/image/thumbnail.svg"
              alt="background image"
              style={{
                objectFit: "contain",
                objectPosition: "right",
              }}
              draggable={false}
              fill
            />
          </div> */}
        </div>
      </main>
    </div>
  );
}
