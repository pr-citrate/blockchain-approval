"use client";
import styles from "../../styles/Admin.module.css";
import { useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.profileCard}>
            <p className={styles.username}>{session?.user?.name}</p>
            <p className={styles.email}>{session?.user?.email}</p>
          </div>
          <div></div>
          <div className={styles.infoArea}>
            <div>
              <div className={styles.groupInfo}>
                <p className={styles.title}>그룹 이름</p>
                <div className={styles.memberCnt}>9,999명</div>
              </div>
              <p className={styles.enterCode}>초대 코드 : </p>
            </div>
          </div>
          <div className={styles.infoArea}>
            <p className={styles.title}>허가 요청</p>
            <p className={styles.enterCode}>초대 코드 : </p>
          </div>
          <div className={styles.infoArea}>
            <p className={styles.title}>가입 요청</p>
          </div>
        </div>
      </main>
    </div>
  );
}
