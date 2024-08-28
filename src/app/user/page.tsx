"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

/* Style Sheets */
import styles from "../../styles/Admin.module.css";
import modal from "../../styles/Modal.module.css";

/* Icons */
import userIcon from "../../../public/icon/user.svg";
import fileIcon from "../../../public/icon/file.svg";

/* Components */
import Modal from "../../components/Modal";

export default function Login() {
  const { data: session } = useSession();

  const router = useRouter();

  const group: { name: string; memberCnt: number } | null = {
    name: "test",
    memberCnt: 9999,
  } as { name: string; memberCnt: number } | null;

  const permitReq = [
    {
      name: "홍길동",
      email: "test@email.com",
      date: "2024-08-24T21:12:34.155Z",
      title: "Lorem ipsum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sollicitudin pellentesque faucibus. Nulla iaculis tempor egestas. Suspendisse hendrerit enim sed augue semper sollicitudin. Cras sit amet pretium leo. Nunc sed purus at arcu pharetra feugiat. Nunc a magna dolor. Sed eleifend, nisl quis lacinia sodales, turpis ex lacinia turpis, vitae posuere nunc sapien sed neque. Maecenas pharetra tellus eget ante commodo auctor. Sed orci urna, porta ut tincidunt nec, gravida sit amet lacus. Suspendisse venenatis nisi sem, et gravida massa cursus vel. Fusce lacinia efficitur velit, vitae aliquam ex blandit non. Aenean fringilla metus sapien, id aliquet mauris condimentum eget. Nunc a rhoncus nibh. Donec non nunc velit. Quisque tincidunt velit sit amet dui commodo, quis gravida nibh feugiat.",
      files: ["file1.pdf", "file2.pdf", "file3.pdf", "file4.pdf", "file5.pdf"],
      permit: false,
    },
    {
      name: "이순신",
      email: "test@email.com",
      date: "2024-08-24T21:12:34.155Z",
      title: "Lorem ipsum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sollicitudin pellentesque faucibus. Nulla iaculis tempor egestas. Suspendisse hendrerit enim sed augue semper sollicitudin. Cras sit amet pretium leo. Nunc sed purus at arcu pharetra feugiat. Nunc a magna dolor. Sed eleifend, nisl quis lacinia sodales, turpis ex lacinia turpis, vitae posuere nunc sapien sed neque. Maecenas pharetra tellus eget ante commodo auctor. Sed orci urna, porta ut tincidunt nec, gravida sit amet lacus. Suspendisse venenatis nisi sem, et gravida massa cursus vel. Fusce lacinia efficitur velit, vitae aliquam ex blandit non. Aenean fringilla metus sapien, id aliquet mauris condimentum eget. Nunc a rhoncus nibh. Donec non nunc velit. Quisque tincidunt velit sit amet dui commodo, quis gravida nibh feugiat.",
      files: ["file1.pdf", "file2.pdf"],
      permit: true,
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [modalType, setModalType] = useState<"join" | "exit">("join");

  const openModal = (type: "join" | "exit" = "join") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createGroup = () => {
    setGroupName(groupName.trim().replace(/[^a-zA-Z]/g, ""));
    if (!groupName || groupName.length != 5)
      return alert("초대 코드는 5자로 입력해주세요.");
    alert(`그룹 ${groupName}에 참가를 신청하였습니다.`);
    closeModal();
  };

  const deleteGroup = () => {
    if (!groupName || groupName !== group?.name)
      return alert("그룹 이름을 정확히 입력해주세요.");
    alert(`그룹 ${groupName}에서 탈퇴하였습니다.`);
    router.push("/");
  };

  // if (!session) return router.push("/login");

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {modalType == "join" ? (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <p className={modal.subtitle}>초대 코드</p>
            <div className={modal.inputContainer}>
              <input
                type="text"
                placeholder="그룹 초대 코드를 입력해주세요."
                id="group_name"
                onChange={(e) => setGroupName(e.target.value)}
                autoComplete="off"
                maxLength={5}
                minLength={5}
                onKeyPress={(e) => {
                  if (
                    !/^[a-zA-Z0-9]*$/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "Enter"
                  )
                    e.preventDefault();
                }}
              />
            </div>
            <div className={modal.btnContainer}>
              <div className={modal.defaultBtn} onClick={createGroup}>
                참가하기
              </div>
            </div>
          </Modal>
        ) : (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <p className={modal.subtitle}>
              {session?.user?.name}/{group?.name}
            </p>
            <div className={modal.inputContainer}>
              <input
                type="text"
                id="delete_check"
                placeholder="탈퇴를 위해서 위 내용을 정확히 입력해주세요."
                onChange={(e) => setGroupName(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className={modal.btnContainer}>
              <div className={modal.dangerBtn} onClick={deleteGroup}>
                탈퇴하기
              </div>
            </div>
          </Modal>
        )}

        <div className={styles.content}>
          <div className={styles.profileCard}>
            <p className={styles.username}>{session?.user?.name}</p>
            <p className={styles.email}>{session?.user?.email}</p>
          </div>
          <div style={{ width: "0%" }}></div>
          <div>
            <div className={styles.infoArea}>
              <div className={styles.groupInfo}>
                {!group ? (
                  <div className={styles.boxContainer}>
                    <p className={styles.title}>소속된 그룹이 없습니다.</p>
                    <div className={styles.btnContainer}>
                      <div
                        className={styles.defaultBtn}
                        onClick={() => openModal("join")}
                      >
                        그룹 가입하기
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.boxContainer}>
                    <div className={styles.titleContainer}>
                      <p className={styles.title}>{group.name}</p>
                      <div className={styles.memberCnt}>
                        <Image
                          src={userIcon}
                          alt="User Icon"
                          width={18}
                          height={18}
                          title="그룹 멤버 수"
                        />{" "}
                        {group.memberCnt.toLocaleString()}명
                      </div>
                    </div>
                    <div className={styles.btnContainer}>
                      {/* <div className={styles.defaultBtn} onClick={openModal}>
                        멤버 관리하기
                      </div> */}
                      <div
                        className={styles.dangerBtn}
                        onClick={() => openModal("exit")}
                      >
                        그룹 탈퇴하기
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.infoArea}>
              <div className={styles.boxContainer}>
                <p className={styles.title}>허가 결과</p>
                <div className={styles.enterReqContainer}>
                  {permitReq.map((req, idx) => (
                    <div className={styles.enterReqBox} key={idx}>
                      <p className={styles.enterReqName}>
                        <span
                          style={{ color: req.permit ? "#31ACA4" : "#EF9090" }}
                        >
                          {req.title} ({req.permit ? "승인됨" : "거절됨"})
                        </span>
                      </p>
                      <p className={styles.enterReqEmail}>
                        {new Date(req.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.infoArea} style={{ width: "100%" }}>
            <div className={styles.boxContainer}>
              <p className={styles.title}>허가 요청</p>
              <div className={styles.permitReqContainer}>
                <input
                  type="text"
                  placeholder="제목을 입력해주세요."
                  className={styles.permitReqInput}
                />
                <input
                  type="text"
                  placeholder="내용을 입력해주세요."
                  className={styles.permitReqInputLong}
                />
                <div className={styles.uploadedFileContainer}></div>
                <div className={styles.uploadBtnContainer}>
                  <div className={styles.fileUploadBtn}>제출하기</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
