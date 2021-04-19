import users from "./userdata"
import pakutasoUsers from "./pakutasoUsers"

const autoExchange = async (node, user) => {
  const fontname:FontName = node.getRangeFontName(0, node.characters.length-1) as FontName;
  await figma.loadFontAsync(fontname)
  
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
const renderImage = (user:string, faceImages, node:Node) => {
  //console.log(faceImages)
  /* const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const newBytes = await encode(canvas, ctx, faceImages) */
  
  const newImg = figma.createImage(faceImages).hash;
  console.log(newImg)
  /* node.fills = [newImg] */
};
/* async function encode(canvas, ctx, imageData) {
  return await new Promise((resolve, reject) => {
    ctx.putImageData(imageData, 0, 0)
    canvas.toBlob(blob => {
      const reader:FileReader = new FileReader()
      reader.onload = () => resolve(new Uint8Array(reader.result))
      reader.onerror = () => reject(new Error('Could not read from blob'))
      reader.readAsArrayBuffer(blob)
    })
  })
} */

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
            renderImage(user.photoURL, msg.faceImages, node);
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
