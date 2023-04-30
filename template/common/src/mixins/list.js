export default {
  data(){
    return {
      list: []
    };
  },
  methods: {
    handleListSuccess(list, listName){
      this[listName || "list"] = list;
    }
  }
};