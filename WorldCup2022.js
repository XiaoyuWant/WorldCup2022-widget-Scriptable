// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: futbol;

const Results = await getinfo(); 
let widget = createWidget(Results); 
Script.setWidget(widget); 
Script.complete(); 


function createWidget(res) {
  var FONTSIZE=11;
 
  const w = new ListWidget(); 
  for(i=0;i<res.length;i++){
    var text="";
    var font;
    
    if(res[i]["ResultType"]==1){
      font=Font.lightRoundedSystemFont(FONTSIZE);
    }else{
      font=Font.blackRoundedSystemFont(FONTSIZE);
    }

    text+=res[i]["Away"]["ShortClubName"]+" " +res[i]["Away"]["Score"]+":"; 
    text+=res[i]["Home"]["Score"]+" "+res[i]["Home"]["ShortClubName"];
    var lineText=w.addText(text)
    lineText.font=font;
    w.addSpacer(1)
  }
  w.presentAccessoryRectangular();
  return w; 
} 

async function getinfo() { 
  var formatter=new DateFormatter();
  formatter.dateFormat="yyyy-MM-dd";
  
  var date0=new Date()
  date0.setDate(date0.getUTCDate());
  var today=formatter.string(date0);

  var date1=new Date()
  date1.setDate(date1.getUTCDate()+1);
  var tomorrow=formatter.string(date1);

  var url = "https://api.fifa.com/api/v3/calendar/matches?language=en&count=500&idSeason=255711"
  url+="&from="+today+"&to="+tomorrow;
  
  var request=new Request(url)
  request.url=url
  request.method='GET'
  request.headers= { "Accept":"application/json","Content-Type": "application/json",}
  var res=await request.loadJSON()

  var objs=res["Results"]
  return objs;
 } 
 
