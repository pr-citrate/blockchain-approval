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
import copyIcon from "../../../public/icon/copy.svg";

/* Components */
import Modal from "../../components/Modal";

export default function Login() {
  const { data: session } = useSession();

  const router = useRouter();

  const group: { name: string; memberCnt: number; enterCode: string } | null = {
    name: "test",
    memberCnt: 9999,
    enterCode: "ABCDE",
  } as { name: string; memberCnt: number; enterCode: string } | null;

  const enterReq = [
    {
      name: "홍길동",
      email: "test@email.com",
      date: "2024-08-24T21:12:34.155Z",
    },
    {
      name: "이순신",
      email: "test@email.com",
      date: "2024-08-25T21:12:34.155Z",
    },
    {
      name: "신사임당",
      email: "test@email.com",
      date: "2024-08-26T21:12:34.155Z",
    },
    {
      name: "세종대왕",
      email: "test@email.com",
      date: "2024-08-27T21:12:34.155Z",
    },
  ];

  const permitReq = [
    {
      name: "홍길동",
      email: "test@email.com",
      date: "2024-08-24T21:12:34.155Z",
      title: "Lorem ipsum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sollicitudin pellentesque faucibus. Nulla iaculis tempor egestas. Suspendisse hendrerit enim sed augue semper sollicitudin. Cras sit amet pretium leo. Nunc sed purus at arcu pharetra feugiat. Nunc a magna dolor. Sed eleifend, nisl quis lacinia sodales, turpis ex lacinia turpis, vitae posuere nunc sapien sed neque. Maecenas pharetra tellus eget ante commodo auctor. Sed orci urna, porta ut tincidunt nec, gravida sit amet lacus. Suspendisse venenatis nisi sem, et gravida massa cursus vel. Fusce lacinia efficitur velit, vitae aliquam ex blandit non. Aenean fringilla metus sapien, id aliquet mauris condimentum eget. Nunc a rhoncus nibh. Donec non nunc velit. Quisque tincidunt velit sit amet dui commodo, quis gravida nibh feugiat.",
      files: ["file1.pdf", "file2.pdf", "file3.pdf", "file4.pdf", "file5.pdf"],
    },
    {
      name: "이순신",
      email: "test@email.com",
      date: "2024-08-24T21:12:34.155Z",
      title: "Lorem ipsum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sollicitudin pellentesque faucibus. Nulla iaculis tempor egestas. Suspendisse hendrerit enim sed augue semper sollicitudin. Cras sit amet pretium leo. Nunc sed purus at arcu pharetra feugiat. Nunc a magna dolor. Sed eleifend, nisl quis lacinia sodales, turpis ex lacinia turpis, vitae posuere nunc sapien sed neque. Maecenas pharetra tellus eget ante commodo auctor. Sed orci urna, porta ut tincidunt nec, gravida sit amet lacus. Suspendisse venenatis nisi sem, et gravida massa cursus vel. Fusce lacinia efficitur velit, vitae aliquam ex blandit non. Aenean fringilla metus sapien, id aliquet mauris condimentum eget. Nunc a rhoncus nibh. Donec non nunc velit. Quisque tincidunt velit sit amet dui commodo, quis gravida nibh feugiat.",
      files: ["file1.pdf", "file2.pdf"],
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [modalType, setModalType] = useState<"create" | "delete" | "member">(
    "create"
  );

  const openModal = (type: "create" | "delete" | "member" = "create") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const copyCode = () => {
    if (isCopied) return;
    setIsCopied(true);
    if (group?.enterCode)
      window.navigator.clipboard.writeText(group?.enterCode);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const createGroup = () => {
    setGroupName(groupName.trim().replace(/[^a-zA-Z]/g, ""));
    if (!groupName || groupName.length < 2 || groupName.length > 10)
      return alert("그룹 이름은 2~10자로 입력해주세요.");
    alert(`그룹 ${groupName}을(를) 개설하였습니다.`);
    closeModal();
  };

  const deleteGroup = () => {
    if (!groupName || groupName !== group?.name)
      return alert("그룹 이름을 정확히 입력해주세요.");
    alert(`그룹 ${groupName}을(를) 삭제하였습니다.`);
    router.push("/");
  };

  // if (!session) return router.push("/login");

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {modalType == "create" ? (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <p className={modal.subtitle}>그룹 이름</p>
            <div className={modal.inputContainer}>
              <input
                type="text"
                placeholder="그룹 이름을 입력해주세요."
                id="group_name"
                onChange={(e) => setGroupName(e.target.value)}
                autoComplete="off"
                maxLength={10}
                minLength={2}
                onKeyPress={(e) => {
                  if (
                    !/^[a-zA-Z]*$/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "Enter"
                  )
                    e.preventDefault();
                }}
              />
            </div>
            <div className={modal.btnContainer}>
              <div className={modal.defaultBtn} onClick={createGroup}>
                개설하기
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
                placeholder="삭제를 위해서 위 내용을 정확히 입력해주세요."
                onChange={(e) => setGroupName(e.target.value)}
                autoComplete="off"
              />
            </div>
            <p className={modal.alertTxt}>
              ※ 그룹 삭제 후 복구는 불가능합니다.
            </p>
            <div className={modal.btnContainer}>
              <div className={modal.dangerBtn} onClick={deleteGroup}>
                삭제하기
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
                    <p className={styles.title}>개설한 그룹이 없습니다.</p>
                    <div className={styles.btnContainer}>
                      <div
                        className={styles.defaultBtn}
                        onClick={() => openModal("create")}
                      >
                        그룹 개설하기
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
                    <p className={styles.enterCode}>
                      {isCopied
                        ? "복사되었습니다"
                        : `초대 코드 : ${group?.enterCode}`}
                      <Image
                        src={copyIcon}
                        alt="Copy Icon"
                        width={18}
                        height={18}
                        onClick={copyCode}
                        style={{
                          cursor: "pointer",
                          marginLeft: "5px",
                          visibility: isCopied ? "hidden" : "visible",
                        }}
                        title="코드 복사하기"
                      />
                    </p>
                    <div className={styles.btnContainer}>
                      {/* <div className={styles.defaultBtn} onClick={openModal}>
                        멤버 관리하기
                      </div> */}
                      <div
                        className={styles.dangerBtn}
                        onClick={() => openModal("delete")}
                      >
                        그룹 삭제하기
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.infoArea}>
              <div className={styles.boxContainer}>
                <p className={styles.title}>가입 요청</p>
                <div className={styles.enterReqContainer}>
                  {enterReq.map((req, idx) => (
                    <div className={styles.enterReqBox} key={idx}>
                      <p className={styles.enterReqName}>
                        <span style={{ color: "#31ACA4" }}>{req.name}</span>{" "}
                        님이 그룹 가입을 요청했습니다.
                      </p>
                      <p className={styles.enterReqEmail}>
                        {req.email} - {new Date(req.date).toLocaleDateString()}
                      </p>
                      <div className={styles.enterReqBtn}>
                        <div className={styles.defaultBtn}>수락</div>
                        <div className={styles.dangerBtn}>거절</div>
                      </div>
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
                {permitReq.map((req, idx) => (
                  <div className={styles.permitReqBox} key={idx}>
                    <p className={styles.permitReqName}>{req.title}</p>
                    <p className={styles.permitReqEmail}>
                      {req.name} / {req.email}
                    </p>
                    <p
                      className={styles.permitReqEmail}
                      style={{ color: "#BDBDBD" }}
                    >
                      {new Date(req.date).toLocaleDateString()}
                    </p>
                    <p className={styles.permitReqContent}>{req.content}</p>
                    <div className={styles.permitReqFiles}>
                      {req.files.map((file, idx) => (
                        <a
                          href={`/${file}`}
                          key={idx}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.permitReqFile}
                        >
                          {file}
                        </a>
                      ))}
                    </div>
                    <div className={styles.permitReqBtn}>
                      <div className={styles.defaultBtn}>수락</div>
                      <div className={styles.dangerBtn}>거절</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
