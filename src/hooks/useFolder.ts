import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { useReducer } from "react";

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

export function useFolder(
    folderId: any = null,
    folder: any = null,
    parentFolder: any = null
){
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        parentFolder,
        childFolders: [],
        childFiles: [],
        loading: false
    })

    const { currentUser } = useAuth()


    return state
}

