import { Dispatch } from "redux";
import { message as messageModal } from "antd";
import WebIM from "@/config/WebIM";
import { ChangeStatusMessageType, MessageType } from "../reducer/message";

interface MessageActionTypeList {
  ADD_MESSAGE: MessageType;
  CHANGE_MESSAGE_STATUS: ChangeStatusMessageType;
}
interface MessageAction<K extends keyof MessageActionTypeList> {
  type: K;
  payload: {
    state: MessageActionTypeList[K];
  };
}

const addMessage = (message: MessageType) => {
  return {
    type: "ADD_MESSAGE",
    payload: {
      state: message
    }
  };
};

const changeMessageStatus = (changeStatusMessage: ChangeStatusMessageType) => {
  return {
    type: "CHANGE_MESSAGE_STATUS",
    payload: {
      state: changeStatusMessage
    }
  };
};

const sendMessageAction = (to: string, message: string) => {
  return (dispatch: Dispatch) => {
    const id = WebIM.conn.getUniqueId(); // 生成本地消息id
    dispatch(
      addMessage({
        to,
        id,
        message,
        time: new Date().getTime().toString(),
        status: "pending"
      })
    );
    return WebIM.sendSingleMessage(id, to, message)
      .then(() => {
        dispatch(
          changeMessageStatus({
            to,
            id,
            status: "fulfilled"
          })
        );
      })
      .catch(() => {
        messageModal.error("消息发送失败!");
        dispatch(
          changeMessageStatus({
            to,
            id,
            status: "rejected"
          })
        );
      });
  };
};

export { MessageActionTypeList, MessageAction, addMessage, sendMessageAction };
