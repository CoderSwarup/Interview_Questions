const useTraverseTree = () => {
  //Insert File or Folder
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });
      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((obj) => {
      return insertNode(obj, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  }

  //Delete File or Folder
  function DeleteNode(tree, folderId) {
    // if (tree.id === "1") {
    //   return {};
    // }
    let newItems = [];

    newItems = tree.items
      .map((item) => {
        return DeleteNode(item, folderId);
      })
      .filter((i) => i.id !== folderId);

    return { ...tree, items: newItems };
  }

  //Update name of file or folder
  function updateName(tree, ItemId, ItemName) {
    if (tree.id === ItemId) {
      return { ...tree, name: ItemName };
    } else {
      let updatedItems = [];
      updatedItems = tree.items.map((item) => {
        return updateName(item, ItemId, ItemName);
      });
      return { ...tree, items: updatedItems };
    }
  }

  return { insertNode, DeleteNode, updateName };
};

export default useTraverseTree;
