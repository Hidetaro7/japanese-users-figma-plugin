import users from "./userdata"
import pakutasoUsers from "./pakutasoUsers"

const autoExchange =  (node, user) => {
  return new Promise(async (resolve, reject) => {
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
    resolve(node);
  })
  
}

let testCount:number = 0

figma.showUI(__html__, { width: 500, height: 700 });

figma.ui.onmessage = async msg => {
  const page:PageNode = figma.currentPage as PageNode;
  if(msg.type === "auto-exchange") {
    // ユーザーをシャッフル
    const shuffledUsers = shuffle(pakutasoUsers)
    page.selection.forEach(async anynode => {
      let user = shuffledUsers[testCount]
      testCount = testCount >= pakutasoUsers.length-1 ? 0 : ++testCount;
      if(anynode.type === "FRAME" || anynode.type === "INSTANCE") {
        console.log("-------------------")
        const searchTextNode = async (node) => {
            if(node.name === "photo") {
              console.log(user.pid, "photo")
              const hash = figma.createImage(msg.faceImages[user.pid]).hash;
               node.fills = [{ type: "IMAGE" as const, scaleMode: "FILL", imageHash: hash}];
            } else if(node.type === "TEXT") {
              console.log(user.pid, "text")
              await autoExchange(node, user);
            } else if(node.type === "FRAME" || node.type === "GROUP" && node.children.length !== 0) {
              node.children.forEach(moreChildNode => {
                searchTextNode(moreChildNode)
              });
            }
        }
        anynode.children.forEach(  (node) => {
          searchTextNode(node);
          console.log("anynode---", testCount)
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

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  return arr;
}