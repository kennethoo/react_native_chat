const  initState={
    room:{}

}
const rootReducer =(state = initState,action)=>{


if(action.type=="UPDATE_ROOM"){
    return{
        ...state,
        room:action.data
    }
}
 return state
}

export default rootReducer