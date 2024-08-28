"use client";
import Image from "next/image";
import styles from "../../styles/Login.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Login() {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.textform}>
            <h1 className={styles.title}>PermitChain</h1>
            {!session ? (
              <div>
                <p className={styles.subtitle}>로그인을 진행해주세요.</p>
                <button
                  className={styles.typeButton}
                  onClick={() => {
                    signIn();
                  }}
                >
                  로그인
                </button>
              </div>
            ) : (
              // <div>
              //   <p className={styles.subtitle} style={{ float: "none" }}>
              //     관리자 계정으로 진행할 것인지,
              //     <br />
              //     유저 계정으로 진행할 것인지 선택해주세요.
              //   </p>
              //   <div className="buttons">
              //     <button
              //       className={styles.typeButton}
              //       onClick={() => {
              //         signIn();
              //       }}
              //     >
              //       관리자
              //     </button>
              //     <button
              //       className={styles.typeButton}
              //       onClick={() => {
              //         signIn();
              //       }}
              //     >
              //       유저
              //     </button>
              //   </div>
              // </div>
              <div style={{ flexDirection: "column" }}>
                <p className={styles.subtitle}>이미 로그인되어 있습니다.</p>
                <Link href="/" className={styles.typeButton}>
                  홈으로 가기
                </Link>
                <button
                  className={styles.typeButton}
                  onClick={() => {
                    signOut();
                  }}
                >
                  로그아웃
                </button>
              </div>
            )}
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
