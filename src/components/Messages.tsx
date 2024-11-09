import { messageServerType } from "./Chat";
import styles from "../styles/Messages.module.css";

type Props = {
  messages: messageServerType[];
  name: string;
};

export const Messages = ({ messages, name }: Props) => {
  return (
    <div className={styles.messages}>
      {messages.map(({ user, message }, index) => {
        const itsMe = user.name === name;
        const currentUser = itsMe ? styles.me : styles.user;
        const adminStyle =
          user.name === "Admin" ? { color: "rgb(158, 79, 247)", fontWeight: "700" } : {};

        return (
          <div className={`${styles.message} ${currentUser}`} key={index}>
            <span className={styles.user} style={adminStyle}>
              {user.name}
            </span>
            <div className={styles.text}>{message}</div>
          </div>
        );
      })}
    </div>
  );
};
