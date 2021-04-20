import users from "./userdata"
import pakutasoUsers from "./pakutasoUsers"

const autoExchange = async (node, user) => {
  let len = node.characters.length
  for (let i = 0; i < len; i++) {
    await figma.loadFontAsync(node.getRangeFontName(i, i+1))
  }
  
  switch(node.characters) {
    case "名前":
      node.characters = user.name;
      break;
    case "ふりがな":
      node.characters = user.kana;
      break;
    case "住所":
      node.characters = user.pref + user.city + user.town + user.add1;
      break;
    case "都道府県名":
      node.characters = user.pref;
      break;
    case "都市名":
      node.characters = user.pref + user.town;
      break;
    case "email":
      node.characters = user.email;
      break;  
    case "自己紹介":
      node.characters = user.introduce;
      break;                
  }
}
const renderImage = (userNum:number, faceImages, node) => {
  const image = faceImages[userNum];
  console.log(image)
  const hash = figma.createImage(image).hash;
  node.fills = [{ type: "IMAGE" as const, scaleMode: "FILL", imageHash: hash}];
};

figma.showUI(__html__, { width: 500, height: 700 });

figma.ui.onmessage = async msg => {
  const page:PageNode = figma.currentPage as PageNode;
  if(msg.type === "auto-exchange") {
    page.selection.forEach(async anynode => {
      if(anynode.type === "FRAME" || anynode.type === "INSTANCE") {
        // 自動変換
        const user = pakutasoUsers[Math.floor(Math.random() * pakutasoUsers.length)]
        const searchTextNode = (node) => {
          if(node.name === "photo") {
            renderImage(user.photoIndex, msg.faceImages, node);
          } else if(node.type === "TEXT") {
            autoExchange(node, user)
          } else if(node.type === "FRAME" || node.type === "GROUP" && node.children.length !== 0) {
            node.children.forEach(moreChildNode => {
              searchTextNode(moreChildNode)
            });
          }
        }
        anynode.children.forEach( node => {
          searchTextNode(node)
        })
      } else {
        figma.ui.postMessage(
          { pluginMessage: { type: "error-message", params: "Frame、もしくはインスタンス以外が選ばれていますが、そちらは無視しました" } });
      }
    })
  } else {
    page.selection.forEach(async anynode => {
      if(anynode.type === "TEXT") {
        const fontname:FontName = anynode.getRangeFontName(0, anynode.characters.length-1) as FontName;
        await figma.loadFontAsync(fontname)
       anynode.fontName = fontname;
  
       const i:number = Math.floor(Math.random() * users.length);
      let resUserData:string;
      switch(msg.params) {
        case "name" :
          resUserData = users[i].name;
          break;
        case "kana" :
          resUserData = users[i].kana;
          break;
        case "email" :
          resUserData = users[i].email;
          break;
        case "birthday" :
          resUserData = users[i].birthday;
          break;
        case "pref" :
          resUserData = users[i].pref;
          break;
        case "city" :
          resUserData = users[i].pref + users[i].city;
          break;
        case "town" :
          resUserData = users[i].pref + users[i].city + users[i].town;
          break;
        case "add1" :
          resUserData = users[i].pref + users[i].city + users[i].town + users[i].add1;
          break;
      }
       anynode.characters = resUserData
      }
      
    })
  }
  

  /*  */
 
  
  //figma.closePlugin();
};
