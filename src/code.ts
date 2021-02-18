import users from "./userdata"

figma.showUI(__html__, { width: 400, height: 400 });

figma.ui.onmessage = async msg => {
  const page:PageNode = figma.currentPage as PageNode;
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
 
  
  //figma.closePlugin();
};
