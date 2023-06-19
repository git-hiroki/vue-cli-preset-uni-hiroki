import { archive as modal } from "@/store/modules/modal";
import { archive as popup } from "@/store/modules/popup";
import { archive as navbar } from "@/store/modules/navbar";

export default {
  "*": {
    modal,
    popup,
    navbar
  },

  "/pages/login/index": {
    navbar: {
      title: "登录",
      back: true,
      reload: false
    }
  }
};