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

    default:
      return state;
  }
}

export function useFolder(folderId: any = null, folder: any = null) {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
    loading: false,
  });

  const { currentUser } = useAuth();

  useEffect(() => {
    return dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folder, folderId } });
  }, [folder, folderId]);

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
      console.log('result: ' + result)
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: result },
      });
    })
    
  }, [folderId]);

  useEffect(() => {
    const childFolders = Folders.getChildFolders(currentUser.uid, folderId)
    .then((result: any) => {
      return dispatch({
        type: ACTIONS.SET_CHILD_FOLDERS,
        payload: { childFolders: result}
      })
    })

    
    
  }, [folderId])
  

  return state;
}
