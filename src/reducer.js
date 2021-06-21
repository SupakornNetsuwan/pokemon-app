export const reducer = (state , action) =>{
    if(action["type"] === "PAGE_1"){
      return {
        page:1
      }
    }else if(action.type === "PAGE_2"){
      return {
        page:2
      }
    }

    throw new Error("WTF there's no this action type")
  }