import React, { ChangeEvent, MouseEventHandler, useState } from "react";
import styles from "../styles/Main.module.css";
import { Link } from "react-router-dom";

const FIELDS = {
  NAME: "name",
  ROOM: "room",
} as const;

export type UserFormType = {
  name: string;
  room: string;
};

export const Main = () => {
  const { NAME, ROOM } = FIELDS;

  const initialUserForm = { [NAME]: "", [ROOM]: "" };

  const [userForm, setUserForm] = useState<UserFormType>(initialUserForm);

  const formChangeHandler = ({ currentTarget: { value, name } }: ChangeEvent<HTMLInputElement>) => {
    setUserForm((userForm) => ({
      ...userForm,
      [name]: value.replace(/[^a-zA-Zа-яА-Я0-9]/g, ""),
    }));
  };

  const checkInputValidity: MouseEventHandler<HTMLAnchorElement> = (e) => {
    const isCheck = Object.values(userForm).some((v) => !v);
    const inputs = document.querySelectorAll("input[required]");

    if (isCheck) {
      inputs.forEach((input) => {
        input.classList.add(styles["input-error"]);
        e.preventDefault();
      });
    } else {
      inputs.forEach((input) => {
        input.classList.remove(styles["input-error"]);
      });
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Join</h1>

        <form className={styles.form}>
          <div className={styles.group}>
            <input
              type="text"
              name={NAME}
              placeholder="Name"
              value={userForm[NAME]}
              onChange={formChangeHandler}
              className={styles.input}
              autoComplete="off"
              required
            />
          </div>

          <div className={styles.group}>
            <input
              type="text"
              name={ROOM}
              placeholder="Room"
              value={userForm[ROOM]}
              onChange={formChangeHandler}
              className={styles.input}
              autoComplete="off"
              required={true}
            />
          </div>

          <Link
            to={`/chat?name=${userForm[NAME]}&room=${userForm[ROOM]}`}
            className={`${styles.link} ${styles.group}`}
            onClick={checkInputValidity}
          >
            <button type="submit" className={styles.button}>
              Sign In
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};
