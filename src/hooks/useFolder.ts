import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useReducer } from "react";
import { Folders } from "../api/Folders";

const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_PARENT_FOLDER: "set-parent-folder",
  SET_CHILD_FOLDERS: "set-child-folders",
  SET_CHILD_FILES: "set-child-files",
  SET_ALL_FOLDERS: "set-folders"
};

export const ROOT_FOLDER = {
  name: "root",
  id: "root",
  path: [],
};

function reducer(state: any, { type, payload }: any) {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        parentFolder: payload.parentFolder,
        allFolders: [],
        childFolders: [],
        childFiles: [],
      };

    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };

    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
      };

    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles,
      };

    case ACTIONS.SET_ALL_FOLDERS:
      return {
        ...state,
        allFolders: payload.allFolders
      }

    default:
      return state;
  }
}

export function useFolder(folderId: any = null, folder: any = null) {

  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    allFolders: [],
    childFolders: [],
    childFiles: [],
    loading: false,
  });

  const { currentUser } = useAuth();

  useEffect(() => {
    return dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folder, folderId } });
  }, [folder, folderId]);

  //CurrentFolder
  useEffect(() => {
    if (folderId == null) {
      const rootFolder: any = Folders.getFolderById(currentUser.uid)
      .then((result: any) => {
        return dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: result },
        });
      })

  
    }

    const currentFolder = Folders.getFolderById(folderId)
    .then((result: any ) => {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: result },
      });
    })
    
  }, [folderId]);



  //ChildFolders
  useEffect(() => {
    const childFolders = Folders.getChildFolders(currentUser.uid, folderId)
    .then((result: any) => {
      return dispatch({
        type: ACTIONS.SET_CHILD_FOLDERS,
        payload: { childFolders: result}
      })
    })

  }, [folderId])

  useEffect(() => {
  
    const allFolders = Folders.getFolders(currentUser.uid)
    .then((result: any) => {

      //console.log("hook: " + JSON.stringify(result))
      return dispatch({
        type: ACTIONS.SET_ALL_FOLDERS,
        payload: { allFolders: result }
      })
    })
    .catch(err => {
      console.log("ERROR useFolder::allFolders()" + err )
      console.error(err)
    })
  },[folderId])
  

  return state;
}
